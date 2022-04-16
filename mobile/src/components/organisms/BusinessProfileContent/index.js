import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import HorizontalBlock from '../../molecules/HorizontalBlock';
import TopBanner from '../../molecules/TopBanner';

const BusinessProfileContent = () => {
	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	const account = useSelector((state) => state.account);

	const accountPoints = [
		{
			title: '10AM - 10PM',
			onPress: () => {
				console.log('Points Pressed');
			},
		},
	];
	const myAccountOptions = [
		{
			title: 'Close queue',
			onPress: () => {
				console.log('Closing queue...');
			},
		},
		{
			title: 'Set queue time',
			onPress: () => {
				console.log('Setting queue time...');
			},
		},
		{
			title: 'Publish offers',
			onPress: () => {
				console.log('Publishing offers...');
			},
		},
	];
	const generalOptions = [
		{
			title: 'General Option 1',
			onPress: () => {
				console.log('General Option 1 Pressed');
			},
		},
		{
			title: 'General Option 2',
			onPress: () => {
				console.log('General Option 2 Pressed');
			},
		},
		{
			title: 'General Option 3',
			onPress: () => {
				console.log('General Option 3 Pressed');
			},
		},
	];

	return (
		<ScrollView>
			<TopBanner
				title={`${account.userName}`}
				subtitle={'Edit Profile'}
				leftAvatar={true}
				avatarImage={reactNativeLogo}
				bannerContentContainerStyle={styles.bannerContainer}
				titleStyle={styles.bannerTitle}
				subtitleStyle={styles.bannerSubtitle}
			></TopBanner>
			<HorizontalBlock
				blockTitle={'Manage your store'}
				blockElements={accountPoints}
				blockElementTitlesStyle={styles.accountPoints}
			></HorizontalBlock>
			<HorizontalBlock
				blockTitle={'My Account'}
				blockElements={myAccountOptions}
			></HorizontalBlock>
			<HorizontalBlock
				blockTitle={'General'}
				blockElements={generalOptions}
			></HorizontalBlock>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	bannerContainer: {
		justifyContent: 'flex-start',
	},

	bannerTitle: {
		marginTop: 20,
		marginBottom: 5,
		marginHorizontal: 20,
	},

	bannerSubtitle: {
		marginTop: 5,
		marginBottom: 20,
		marginHorizontal: 20,
	},

	accountPoints: {
		fontWeight: 'bold',
		fontSize: 48,
		alignSelf: 'center',
	},
});

export default BusinessProfileContent;
