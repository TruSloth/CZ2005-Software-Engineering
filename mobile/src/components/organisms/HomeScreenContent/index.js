import React, {useEffect, useRef, useState} from 'react';

import {FlatList, View, StyleSheet, Platform, ScrollView, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';
import TappableCard from '../../atoms/TappableCard';
import HorizontalSection from '../../atoms/HorizontalSection';
import TopBanner from '../../molecules/TopBanner';
import CategoryFilter from '../../atoms/CategoryFilter';
import AppBottomSheet from '../../molecules/AppBottomSheet';
import StoreInfoContent from '../../molecules/StoreInfoContent';
import QueueSheetContent from '../../molecules/QueueSheetContent';
import {set} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import QRCodeScanner from 'react-native-qrcode-scanner';



const HomeScreenContent = (props) => {

	const {navigation, joinServiceProviderQueue} = props;

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
	

	const [nearbyRestaurantsData, setNearbyRestaurantsData] = useState([
		{
			title: 'Location 1',
			subtitle: '5 stars',
			subtextLine1: '10 in Queue',
		},
		{
			title: 'Location 2',
			subtitle: '5 stars',
			subtextLine1: '10 in Queue',
		},
		{
			title: 'Location 3',
			subtitle: '5 stars',
			subtextLine1: '10 in Queue',
		},
		{
			title: 'Location 4',
			subtitle: '5 stars',
			subtextLine1: '10 in Queue',
		},
	]);

	const sheetRef = useRef(null);

	const account = useSelector((state) => state.account)

	const openStoreInfo = () => {
		sheetRef.current.snapTo(0);
	};

	const openQueue = () => {
		setIsQueueSheetOpen(true);
	};

	const closeQueue = () => {
		setIsQueueSheetOpen(false);
		setQueuePax(0)
	};

	const onPressCardDescQueue = () => {
		setIsQueueSheetOpen(true);
		sheetRef.current.snapTo(0);
	}

	const moreInfoOnPress = () => {
		navigation.navigate('StoreDetailedInfo');
	};

	const queueIncrement = () => {
        setQueuePax(queuePax + 1);
    }
	const queueDecrement = () => {
		if (queuePax > 0) {
			setQueuePax(queuePax - 1);
		}
	};

	const onQueueConfirm = () => {
		joinServiceProviderQueue(account.userName, 'Temporary Store Name')
	}

	const settingsOnPress = () => {
		navigation.navigate('AppSettings');
	}

	const [search, setSearch] = useState('');

	const [bannerHeight, setBannerHeight] = useState(0);

	const [queuePax, setQueuePax] = useState(0);

	const [isQueueSheetOpen, setIsQueueSheetOpen] = useState(false);

	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	

	return (
		<View style={{flex: 1}}>
			<ScrollView style={styles.homeScreenContent}>
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
					onChangeText={(text) => setSearch(text)}
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
						<FlatList
							horizontal
							data={nearbyRestaurantsData}
							renderItem={({item}) => {
								return (
									<TappableCard
										cardTitle={item.title}
										cardSubtitle={item.subtitle}
										cardSubtextLine1={item.subtextLine1}
										cardSubtextLine2={item.subtextLine2}
									></TappableCard>
								);
							}}
						></FlatList>
					}
					title={'Nearby Restaurants'}
					titleStyle={styles.sectionHeader}
				></HorizontalSection>
			</ScrollView>
			<AppBottomSheet 
					ref={sheetRef}
					renderContent={isQueueSheetOpen ? QueueSheetContent : StoreInfoContent}
					moreInfoOnPress={moreInfoOnPress}
					queueOnPress={openQueue}
					onCloseEnd={closeQueue}
					count={queuePax}
					onPressPlus={queueIncrement}
					onPressMinus={queueDecrement}
					onPressCancel={closeQueue}
					onPressConfirm={onQueueConfirm}
			>
				 
			</AppBottomSheet>
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
