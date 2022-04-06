import React, {useEffect, useRef, useState, useCallback} from 'react';

import {
	FlatList,
	View,
	StyleSheet,
	Platform,
	ScrollView,
	Text,
	RefreshControl,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {useQuery, useQueryClient} from 'react-query';
import GetLocation from 'react-native-get-location';
import {isPointWithinRadius} from 'geolib';

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
import {getQueue} from '../../../services/queue/getQueue';

/**
 * Renders the content for the Application Home Screen.
 *
 * @category Components
 * @exports HomeScreenContent
 * @subcategory Organisms
 *
 * @property {Function} joinServiceProviderQueue Callback to be passed to {@link module:QueueSheetContent|QueueSheetContent}
 */

const HomeScreenContent = (props) => {
	const {
		navigation,
		joinServiceProviderQueue,
		serviceProviderData,
		nearbyVenuesData,
	} = props;

	const queryClient = useQueryClient();

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		queryClient.invalidateQueries('retrieveNearbyServiceProviders');
		setRefreshing(false);
	}, []);

	const [previouslyVisitedData, setPreviouslyVisitedData] = useState([
		{
			title: 'Location 1',
			subtitle: '5 Stars',
			subtextLine1: '10 in Queue',
			subtextLine2: '~ 5 mins',
		},
		{
			title: 'Location 2',
			subtitle: '4 Stars',
			subtextLine1: '5 in Queue',
			subtextLine2: '~ 5 mins',
		},
		{
			title: 'Location 3',
			subtitle: '3 Stars',
			subtextLine1: '3 in Queue',
			subtextLine2: '~ 5 mins',
		},
	]);

	const sheetRef = useRef(null);

	const account = useSelector((state) => state.account);

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
		navigation.navigate('LiveChat');
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
		closeQueue();
		sheetRef.current.snapTo(2);
		await joinServiceProviderQueue(
			account.userName,
			currentlyOpenStore.venueID,
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
		}
	}, [serviceProviderData]);

	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	return (
		<View style={{flex: 1}}>
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
							data={previouslyVisitedData}
							renderItem={({item}) => {
								return (
									<TappableCard
										cardTitle={item.title}
										cardSubtitle={item.subtitle}
										cardSubtextLine1={item.subtextLine1}
										cardSubtextLine2={item.subtextLine2}
										onPress={openStoreInfo}
										onPressCardDesc={onPressCardDescQueue}
									></TappableCard>
								);
							}}
						></FlatList>
					}
					title={'Previously Visited'}
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
			</ScrollView>
			<AppBottomSheet
				ref={sheetRef}
				renderContent={
					isQueueSheetOpen ? QueueSheetContent : StoreInfoContent
				}
				moreInfoOnPress={moreInfoOnPress}
				queueOnPress={openQueue}
				chatOnPress={onPressChat}
				onCloseEnd={closeQueue}
				count={queuePax}
				onPressPlus={queueIncrement}
				onPressMinus={queueDecrement}
				onPressCancel={closeQueue}
				onPressConfirm={onQueueConfirm}
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
		</View>
	);
};

const styles = StyleSheet.create({
	homeScreenContent: {},

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
});

export default HomeScreenContent;
