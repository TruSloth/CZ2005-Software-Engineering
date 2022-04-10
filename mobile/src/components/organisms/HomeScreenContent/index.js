import React, {useEffect, useRef, useState, useCallback} from 'react';

import {
	FlatList,
	View,
	StyleSheet,
	Platform,
	ScrollView,
	Text,
	RefreshControl,
	Dimensions,
} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useQuery, useQueryClient} from 'react-query';

import {getNearbyServiceProviders} from '../../../services/serviceProviders/getNearbyServiceProviders';
import TappableCard from '../../atoms/TappableCard';
import HorizontalSection from '../../atoms/HorizontalSection';
import TopBanner from '../../molecules/TopBanner';
import CategoryFilter from '../../atoms/CategoryFilter';
import {
	AppBottomSheet,
	StoreInfoContent,
	QueueSheetContent,
} from '../../molecules/BottomSheet';
import {getQueueWaitTime} from '../../../services/queue/getQueueWaitTime';
import QueueBar from '../../molecules/QueueBar';
import {updateCurrentQueue} from '../../../store/account/actions';
import PushNotification from 'react-native-push-notification';

/**
 * Renders the content for the Application Home Screen.
 *
 * @category Components
 * @exports HomeScreenContent
 * @subcategory Organisms
 *
 * @property {Function} joinServiceProviderQueue Callback to be passed to {@link module:QueueSheetContent|QueueSheetContent}
 */

const {width, height} = Dimensions.get('window');

const HomeScreenContent = (props) => {
	const {
		navigation,
		joinServiceProviderQueue,
		leaveServiceProviderQueue,
		serviceProviderData,
		nearbyVenuesData,
		currentQueueWaitTime,
		recommendedServiceProviders
	} = props;

	const queryClient = useQueryClient();

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		queryClient.invalidateQueries('retrieveNearbyServiceProviders');
		setRefreshing(false);
	}, []);

	const [recommendedVenues, setRecommendedVenues] = useState([]);

	const sheetRef = useRef(null);

	const account = useSelector((state) => state.account);
	const socket = useSelector((state) => state.socket).socket;

	useEffect(() => {
		socket.on('queue-reached', () => {
			console.log('queue reached!')
			PushNotification.localNotification({
				channelId: 'notifications',
				message: 'Time to head back!'
			})
			setQueueStatus('reached')
			setTimeout(() => setQueueStatus('arrived'), 5000)
		})

		return () => {
			socket.off('queue-reached')
		}
	})

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

	const onPressChat = () => {
		navigation.navigate('LiveChat', {venueName: currentlyOpenStore.venueName, venueID: currentlyOpenStore.venueID});
	};

	const moreInfoOnPress = () => {
		navigation.navigate('StoreDetailedInfo', {
			storeInformation: currentlyOpenStore,
		});
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
		setQueueStatus('queuing');
		closeQueue();
		sheetRef.current.snapTo(2);
		await joinServiceProviderQueue(
			account.userName,
			currentlyOpenStore.venueID,
			currentlyOpenStore.venueName,
			queuePax
		);
		queryClient.invalidateQueries('retrieveNearbyServiceProviders');
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
			const newData = masterDataSource.filter(function (item) {
				const itemData = item.venueName.toLowerCase();
				const textData = text.toLowerCase();
				return itemData.indexOf(textData) > -1; // Check for character index in the data, will return -1 if non existent
			});
			setFilteredDataSource(newData);
			console.log(filteredDataSource.length);
			if (filteredDataSource.length < 5)
				[console.log(filteredDataSource)];
			setSearch(text);
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			setFilteredDataSource(masterDataSource);
			setSearch(text);
		}
	};

	const [search, setSearch] = useState('');

	const [queueStatus, setQueueStatus] = useState(null);

	const [currentlyOpenStore, setCurrentlyOpenStore] = useState({});

	const [filteredDataSource, setFilteredDataSource] = useState([]);

	const [masterDataSource, setMasterDataSource] = useState([]);

	const [bannerHeight, setBannerHeight] = useState(0);

	const [queuePax, setQueuePax] = useState(0);

	const [isQueueSheetOpen, setIsQueueSheetOpen] = useState(false);

	useEffect(() => {
		if (serviceProviderData !== null) {
			setFilteredDataSource(serviceProviderData);
			setMasterDataSource(serviceProviderData);

			if (recommendedServiceProviders !== null) {
				let recommendedVenueData = []

				recommendedServiceProviders.map((stall) => {
					recommendedVenueData.push(serviceProviderData.find(venue => venue.venueID === stall.venueID))
				})

				setRecommendedVenues(recommendedVenueData)
			}
		}
	}, [serviceProviderData]);

	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

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
					subtitle={'Where are you going to queue next?'}
					avatarImage={reactNativeLogo}
					settingsOnPress={settingsOnPress}
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
					placeholderTextColor={'#7879F1'}
					containerStyle={[
						styles.searchBar,
						{top: bannerHeight + 25},
					]}
					inputContainerStyle={styles.searchBarInput}
				></SearchBar>
				<HorizontalSection
					child={
						<View style={styles.categoryRow}>
							<CategoryFilter
								imageSource={reactNativeLogo}
								title={'Food'}
							></CategoryFilter>
							<CategoryFilter
								imageSource={reactNativeLogo}
								title={'Food'}
							></CategoryFilter>
							<CategoryFilter
								imageSource={reactNativeLogo}
								title={'Food'}
							></CategoryFilter>
							<CategoryFilter
								imageSource={reactNativeLogo}
								title={'Food'}
							></CategoryFilter>
						</View>
					}
				></HorizontalSection>
				<HorizontalSection
					child={
						<FlatList
							horizontal
							data={search === '' ? recommendedVenues : filteredDataSource.slice(0, 11)}
							renderItem={({item}) => {
								return (
									<TappableCard
										cardImage={item.imageAddress}
										cardTitle={item.venueName}
										cardSubtitle={search === '' ? '10 stars' : `${item.venueRatings.$numberDecimal} ⭐`}
										cardSubtextLine1={`${item.queueLength} in Queue`}
										cardSubtextLine2={`~ ${item.waitTime} mins`}
										onPress={() =>
											openStoreInfo(item)
										}
										onPressCardDesc={() =>
											onPressCardDescQueue(item)
										}
										disableCardDesc={
											account.currentQueueID ?? false
										}
									></TappableCard>
								);
							}}
						></FlatList>
					}
					title={search === '' ? 'Recommended Stores' : 'Search Results'}
					titleStyle={styles.sectionHeader}
				></HorizontalSection>
				<HorizontalSection
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
											cardSubtitle={`${item.item.venueRatings.$numberDecimal} ⭐`}
											cardSubtextLine1={`${item.item.queueLength} in Queue`}
											cardSubtextLine2={`~ ${item.item.waitTime} mins`}
											onPress={() =>
												openStoreInfo(item.item)
											}
											onPressCardDesc={() =>
												onPressCardDescQueue(item.item)
											}
											disableCardDesc={
												account.currentQueueID ?? false
											}
										></TappableCard>
									);
								}}
							></FlatList>
						) : (
							<Text>Hello</Text>
						)
					}
					title={'Nearby Restaurants'}
					titleStyle={styles.sectionHeader}
				></HorizontalSection>
				<View style={styles.spacer}></View>
			</ScrollView>
			{account.currentQueueID ? (
				<QueueBar
					leaveQueue={leaveServiceProviderQueue}
					currentQueueWaitTime={currentQueueWaitTime}
					queueStatus={queueStatus}
					style={{
						zIndex: 1,
						position: 'absolute',
						width: width - 20,
						top: height * 0.82,
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
				queueDisabled={account.currentQueueID !== null}
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
				subHeading={`${currentlyOpenStore.queueLength} in queue`}
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
	categoryRow: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		paddingVertical: 20,
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

	sectionHeader: {
		fontWeight: '700',
		fontSize: 16,
		color: '#7879F1',
	},

	searchBarInput: {},

	homeBanner: {
		marginVertical: 20,
	},

	spacer: {
		height: 40
	}
});

export default HomeScreenContent;
