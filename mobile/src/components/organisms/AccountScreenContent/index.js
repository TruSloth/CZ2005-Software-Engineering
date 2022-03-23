import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import HorizontalBlock from '../../molecules/HorizontalBlock';
import TopBanner from '../../molecules/TopBanner';

const AccountScreenContent = () => {
	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	const account = useSelector((state) => state.account);

	const accountPoints = [
		{
			title: '8888 Points',
			onPress: () => {
				console.log('Points Pressed');
			},
		},
	];
	const myAccountOptions = [
		{
			title: 'Link to SingPass',
			onPress: () => {
				console.log('Linking to SingPass...');
			},
		},
		{
			title: 'My Account Option 1',
			onPress: () => {
				console.log('My Account Option 1 pressed');
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
	const joinTheClubOptions = [
		{
			title: 'Join The Club Option 1',
			onPress: () => {
				console.log('Join The Club Option 1 Pressed');
			},
		},
		{
			title: 'Join The Club Option 2',
			onPress: () => {
				console.log('Join The Club Option 2 Pressed');
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
				blockTitle={'You have rewards ready to be used!'}
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
			<HorizontalBlock
				blockTitle={'Join the Club!'}
				blockElements={joinTheClubOptions}
			></HorizontalBlock>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
    bannerContainer: {
        justifyContent: 'flex-start'
    }, 
    
    bannerTitle: {
        marginTop: 20,
        marginBottom: 5,
        marginHorizontal: 20
    },

    bannerSubtitle: {
        marginTop: 5,
        marginBottom: 20,
        marginHorizontal: 20
    },

	accountPoints: {
		fontWeight: 'bold',
		fontSize: 48,
		alignSelf: 'center',
	},
});

export default AccountScreenContent;
