import React, {useEffect, useRef, useState, useCallback} from 'react';

import {
	ActivityIndicator,
	FlatList,
	View,
	StyleSheet,
	Platform,
	ScrollView,
	RefreshControl,
	Dimensions,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useQueryClient} from 'react-query';

import TappableCard from '../../atoms/TappableCard';
import HorizontalSection from '../../atoms/HorizontalSection';
import TopBanner from '../../molecules/TopBanner';
import CategoryFilter from '../../atoms/CategoryFilter';
import {
	AppBottomSheet,
	StoreInfoContent,
	QueueSheetContent,
} from '../../molecules/BottomSheet';
import QueueBar from '../../molecules/QueueBar';
import {updateCurrentQueue} from '../../../store/account/actions';
import PushNotification from 'react-native-push-notification';
import {
	IN_STORE,
	NOT_IN_QUEUE,
	QUEUE_REACHED,
} from '../../../store/account/constants';

/**
 * Renders the content for the Application Home Screen.
 *
 * @category Components
 * @exports HomeScreenContent
 * @subcategory Organisms
 *
 * @property {Function} joinServiceProviderQueue Callback to be passed to {@link module:QueueSheetContent|QueueSheetContent}
 * @property {Function} leaveServiceProviderQueue Callback to be passed to {@link module:QueueBar|QueueBar}. Used when manually leaving queue
 * @property {Function} checkOut Callback to be passed to {@link module:QueueBar|QueueBar}. Used when leaving the queue after being notified
 * @property {object(venueAddress, venueID, location, venueName, venueType, venueRatings, numReviews, venueForecast, queueLength, waitTime)[]} serviceProviderData
 * The data for ServiceProviders within the system.
 * 
 * Each entry must contain the following information:
 * 	
 * 
 * 	venueAddress: Physical Address of the ServiceProvider
 * 	venueID: ID of the venue within the system
 * 	venueName: Name of the ServiceProvider
 * 	venueType: Type or Category of the ServiceProvider 
 * 	venueRatings: Average number of ratings for the ServiceProvider
 * 	numReviews: Total number of reviews for the ServiceProvider
 * 	location: Coordinates of the ServiceProvider's physical address. Given in the format:
 * 				{
 * 					type: "Point",
 *     				coordinates: [longitude, latitude],	
 *				}
 *	venueForecast: Forecast of busy times obtained from {@link https://documentation.besttime.app/#forecasts}
 *	queueLength: Number of users in the queue
 *	waitTime: Estimated wait time from system
 *  
 * 
 * @property {object(venueAddress, venueID, location, venueName, venueType, venueRatings, numReviews, venueForecast, queueLength, waitTime)[]} nearbyVenuesData
 * The data for ServiceProviders near the user.
 * 
 * Each entry must contain information in the same format as `serviceProviderData`.
 * @property {Float} currentQueueWaitTime The wait time for the queue the user is currently in
 *  
 */

const {width, height} = Dimensions.get('window');

const HomeScreenContent = (props) => {
	const {
		navigation,
		joinServiceProviderQueue,
		leaveServiceProviderQueue,
		checkOut,
		serviceProviderData,
		nearbyVenuesData,
		currentQueueWaitTime,
		recommendedServiceProviders,
	} = props;

	// TODO: Currently, there seem to be a lot of unnecessary rerenders. Need to figure out why.
	// Code here is a tool to help.
	function useTraceUpdate(props) {
		const prev = useRef(props);
		useEffect(() => {
			const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
				if (prev.current[k] !== v) {
					ps[k] = [prev.current[k], v];
				}
				return ps;
			}, {});
			if (Object.keys(changedProps).length > 0) {
				console.log('Changed props:', changedProps);
			}
			prev.current = props;
		});
	}
	//useTraceUpdate(props)

	// Resource Hooks (Non-effect/Callback)
	const queryClient = useQueryClient();

	const sheetRef = useRef(null);

	const account = useSelector((state) => state.account);
	const socket = useSelector((state) => state.socket).socket;

	const dispatch = useDispatch();

	// Named helper and callback functions
	const openStoreInfo = (venue) => {
		setCurrentlyOpenStore(venue);
		sheetRef.current.snapTo(0);
	};

	const openQueue = () => {
		setIsQueueSheetOpen(true);
	};

	const closeQueue = () => {
		setIsQueueSheetOpen(false);
		setQueuePax(0);
	};

	const onPressCardDescQueue = (venue) => {
		setCurrentlyOpenStore(venue);
		setIsQueueSheetOpen(true);
		sheetRef.current.snapTo(0);
	};

	const onPressGeneralChat = () => {
		navigation.navigate('LiveChat')
	}

	const onPressChat = () => {
		navigation.navigate('LiveChat', {
			venueName: currentlyOpenStore.venueName,
			venueID: currentlyOpenStore.venueID,
		});
	};

	const moreInfoOnPress = () => {
		navigation.navigate('StoreDetailedInfo', {
			venueID: currentlyOpenStore.venueID,
			venueName: currentlyOpenStore.venueName
		});
		sheetRef.current.snapTo(2);
	};

	const queueIncrement = () => {
		setQueuePax(queuePax + 1);
	};
	const queueDecrement = () => {
		if (queuePax > 0) {
			setQueuePax(queuePax - 1);
		}
	};

	const onQueueConfirm = async () => {
		closeQueue();
		sheetRef.current.snapTo(2);
		await joinServiceProviderQueue(
			account.userName,
			currentlyOpenStore.venueID,
			currentlyOpenStore.venueName,
			queuePax
		);
		queryClient.invalidateQueries('retrieveNearbyServiceProviders');
		queryClient.invalidateQueries('retrieveServiceProviders');
		searchFilterFunction(search);
	};

	const settingsOnPress = () => {
		navigation.navigate('AppSettings');
	};

	const searchFilterFunction = (text) => {
		// Check if searched text is not blank
		if (text) {
			// Inserted text is not blank
			// Filter the masterDataSource
			// Update FilteredDataSource
			const newData = serviceProviderData.filter(function (item) {
				const itemData = item.venueName.toLowerCase();
				const textData = text.toLowerCase();
				return itemData.indexOf(textData) > -1; // Check for character index in the data, will return -1 if non existent
			});

			console.log(`search Filter function has found: ${newData.length}`)

			setFilteredDataSource(newData)

			setSearch(text);
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			setFilteredDataSource(serviceProviderData);
			setSearch(text);
		}
	};

	const categoryFilterFunction = (category) => {
		// Reset filter to ALL
		if (category === 'ALL') {
			searchFilterFunction(search);
			setFiltered(false);
			return;
		}

		let filteredData;

		// Check if filter is already in use
		// If so, reset the filtered results
		if (filtered) {
			if (search) {
				filteredData = serviceProviderData.filter(function (item) {
					const itemData = item.venueName.toLowerCase();
					const textData = search.toLowerCase();
					return itemData.indexOf(textData) > -1; // Check for character index in the data, will return -1 if non existent
				});
			} else {
				filteredData = serviceProviderData;
			}
		} else {
			filteredData = filteredDataSource;
		}

		const newData = filteredData.filter((item) => {
			return item.venueType.includes(category);
		})

		setFilteredDataSource(newData);

		setFiltered(true);
		return;
	}

	// State Hooks
	const [refreshing, setRefreshing] = useState(false);
	const [search, setSearch] = useState('');
	const [currentlyOpenStore, setCurrentlyOpenStore] = useState({});
	const [filteredDataSource, setFilteredDataSource] = useState(
		serviceProviderData ?? []
	);
	const [bannerHeight, setBannerHeight] = useState(0);
	const [queuePax, setQueuePax] = useState(0);
	const [isQueueSheetOpen, setIsQueueSheetOpen] = useState(false);
	const [filtered, setFiltered] = useState(false);
	const [recommendedVenues, setRecommendedVenues] = useState([]);

	// Effect and Callback hooks
	// Possible redundancy here. Check if it works if we add account.queueStatus as a dependency
	useEffect(() => {
		socket.on('queue-reached', () => {
			PushNotification.localNotification({
				channelId: 'notifications',
				message: 'Time to head back!',
			});
			dispatch(
				updateCurrentQueue(
					account.currentQueueName,
					account.currentQueueID,
					QUEUE_REACHED
				)
			);
			setTimeout(
				() =>
					dispatch(
						updateCurrentQueue(
							account.currentQueueName,
							account.currentQueueID,
							IN_STORE
						)
					),
				5000
			);
		});

		return () => {
			socket.off('queue-reached');
		};
	});

	useEffect(() => {
		if (serviceProviderData !== null) {
			searchFilterFunction(search);

			if (recommendedServiceProviders !== null) {
				let recommendedVenueData = [];

				recommendedServiceProviders.map((stall) => {
					recommendedVenueData.push(
						serviceProviderData.find(
							(venue) => venue.venueID === stall.venueID
						)
					);
				});

				setRecommendedVenues(recommendedVenueData);
			}
		}
	}, [serviceProviderData]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		queryClient.invalidateQueries('retrieveNearbyServiceProviders');
		queryClient.invalidateQueries('retrieveServiceProviders');
		setRefreshing(false);
	}, []);

	return (
		<>
			<ScrollView
				style={styles.homeScreenContent}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					></RefreshControl>
				}
			>
				<TopBanner
					title={`Hi, ${account.userName}`}
					titleStyle={styles.bannerTitle}
					subtitle={'Where are you going to queue next?'}
					subtitleStyle={styles.bannerSubtitle}
					avatarImage={account.avatarImageURL !== null  ? {uri: account.avatarImageURL} : account.avatarImage}
					settingsOnPress={settingsOnPress}
					chatOnPress={onPressGeneralChat}
					actionBar={true}
					style={styles.homeBanner}
					onLayout={(e) => {
						e.persist();
						setBannerHeight(
							e && e.nativeEvent ? e.nativeEvent.layout.height : 0
						);
					}}
				></TopBanner>

				<SearchBar
					onChangeText={(text) => searchFilterFunction(text)}
					value={search}
					platform={Platform.OS === 'ios' ? 'ios' : 'android'}
					onClear={(text) => setSearch('')}
					round={false}
					placeholder={'Search'}
					placeholderTextColor={'#AAAAAA'}
					containerStyle={[
						styles.searchBar,
						{top: bannerHeight - 25},
					]}
					inputContainerStyle={styles.searchBarInput}
				></SearchBar>

				<HorizontalSection
					style={styles.categoryRowContainer}
					child={
						<View style={styles.categoryRow}>
							<CategoryFilter
								imageSource={require('../../../assets/filter-all.png')}
								title={'All'}
								onPress={() => {categoryFilterFunction('ALL')}}
							></CategoryFilter>
							<CategoryFilter
								imageSource={require('../../../assets/filter-restaurant.png')}
								title={'Restaurant'}
								onPress={() => {categoryFilterFunction('RESTAURANT')}}
							></CategoryFilter>
							<CategoryFilter
								imageSource={require('../../../assets/filter-cafe.png')}
								title={'Cafe'}
								onPress={() => {categoryFilterFunction('CAFE')}}
							></CategoryFilter>
							<CategoryFilter
								imageSource={require('../../../assets/filter-bar.png')}
								title={'Bar'}
								onPress={() => {categoryFilterFunction('BAR')}}
							></CategoryFilter>
						</View>
					}
				></HorizontalSection>
				<HorizontalSection
					child={
						serviceProviderData ? 
						<FlatList
							horizontal
							data={(search === '') && (!filtered) ? recommendedVenues : filteredDataSource.slice(0, 11)}
							renderItem={(item) => {
								return (
									<TappableCard
										cardImage={item.item.imageAddress}
										cardTitle={item.item.venueName}
										cardSubtitle={`⭐ ${item.item.venueRatings.$numberDecimal} (${item.item.numReviews})`}
										cardSubtextLine1={`${item.item.queueLength} 🧑‍🤝‍🧑 in Queue`}
										cardSubtextLine2={`~ ${item.item.waitTime} mins`}
										onPress={() =>
											openStoreInfo(item.item)
										}
										onPressCardDesc={() =>
											onPressCardDescQueue(item.item)
										}
										disableCardDesc={
											account.queueStatus !== NOT_IN_QUEUE
										}
									></TappableCard>
								);
							}}
						></FlatList> : <ActivityIndicator color={'#7879F1'}></ActivityIndicator>
					}
					title={(search === '') && (!filtered) ? 'Recommended Stores' : 'Search Results'}
					titleStyle={styles.sectionHeader}
					style={styles.section}
				></HorizontalSection>
				<HorizontalSection
					// TODO: If location data is not available (timeout or otherwise), properly display error msg
					child={
						nearbyVenuesData ? (
							<FlatList
								horizontal
								data={nearbyVenuesData}
								renderItem={(item) => {
									return (
										<TappableCard
											cardImage={item.item.imageAddress}
											cardTitle={item.item.venueName}
											cardSubtitle={`⭐ ${item.item.venueRatings.$numberDecimal} (${item.item.numReviews})`}
											cardSubtextLine1={`${item.item.queueLength} 🧑‍🤝‍🧑 in Queue`}
											cardSubtextLine2={`~ ${item.item.waitTime} mins`}
											onPress={() =>
												openStoreInfo(item.item)
											}
											onPressCardDesc={() =>
												onPressCardDescQueue(item.item)
											}
											disableCardDesc={
												account.queueStatus !==
												NOT_IN_QUEUE
											}
										></TappableCard>
									);
								}}
							></FlatList>
						) : (
							<ActivityIndicator
								color={'#7879F1'}
							></ActivityIndicator>
						)
					}
					title={'Nearby Restaurants'}
					titleStyle={styles.sectionHeader}
					style={styles.section}
				></HorizontalSection>
				<View style={styles.spacer}></View>
			</ScrollView>
			{account.queueStatus !== NOT_IN_QUEUE ? (
				<QueueBar
					leaveQueue={leaveServiceProviderQueue}
					currentQueueWaitTime={currentQueueWaitTime}
					checkOut={checkOut}
					style={{
						zIndex: 1,
						position: 'absolute',
						width: width - 20,
						top: height * 0.81,
					}}
				></QueueBar>
			) : (
				<></>
			)}
			<AppBottomSheet
				ref={sheetRef}
				renderContent={
					isQueueSheetOpen ? QueueSheetContent : StoreInfoContent
				}
				queueDisabled={account.queueStatus !== NOT_IN_QUEUE}
				moreInfoOnPress={moreInfoOnPress}
				queueOnPress={openQueue}
				chatOnPress={onPressChat}
				onCloseEnd={closeQueue}
				count={queuePax}
				onPressPlus={queueIncrement}
				onPressMinus={queueDecrement}
				onPressCancel={closeQueue}
				onPressConfirm={onQueueConfirm}
				venueID={currentlyOpenStore.venueID}
				storeImage={currentlyOpenStore.imageAddress}
				heading={currentlyOpenStore.venueName}
				waitTime={`~ ${currentlyOpenStore.waitTime} mins`}
				subHeading={`${currentlyOpenStore.queueLength} 🧑‍🤝‍🧑 in queue`}
				rating={
					currentlyOpenStore.venueRatings
						? currentlyOpenStore.venueRatings.$numberDecimal
						: 0
				}
				numReviews={currentlyOpenStore.numReviews}
				text={currentlyOpenStore.venueAddress}
			></AppBottomSheet>
		</>
	);
};

const styles = StyleSheet.create({

	categoryRowContainer: {
		backgroundColor: '#FFF8FA',
		borderColor: '#AAAAAA'
	},

	categoryRow: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		paddingVertical: 20,
	},

	bannerTitle: {
		color: '#000000',
		fontWeight: 'bold'
	},

	bannerSubtitle: {
		color: '#000000'
	},

	searchBar: {
		marginHorizontal: 20,
		borderRadius: 10,
		position: 'absolute',
		width: '90%',
		elevation: 5,
		zIndex: 1,
		height: 50,
		justifyContent: 'center',
	},

	section: {
		borderColor: '#AAAAAA'
	},

	sectionHeader: {
		fontWeight: '700',
		fontSize: 16,
		color: '#000000',
	},

	homeBanner: {
		paddingVertical: 20,
		backgroundColor: '#FCDDEC'
	},

	spacer: {
		height: 50,
	},
});

export default HomeScreenContent;
