import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
	googleIsSignedIn,
	googleSignOut,
} from '../../../services/auth/google/googleSignIn';
import {setCurrentUser, toggleLogIn} from '../../../store/account/actions';
import HorizontalBlock from '../../molecules/HorizontalBlock';

/**
 * Renders the content for the App Settings Screen.
 *
 * @category Components
 * @exports AppSettingsScreenContent
 * @subcategory Organisms
 */

const AppSettingsScreenContent = () => {
	const dispatch = useDispatch();

	const socket = useSelector((state) => state.socket).socket;

	const notificationSettings = [
		{
			title: 'Notification Setting 1',
			onPress: () => {
				console.log('Notification Setting 1 Pressed');
			},
		},
		{
			title: 'Notification Setting 2',
			onPress: () => {
				console.log('Notification Setting 2 Pressed');
			},
		},
	];
	const paymentSettings = [
		{
			title: 'Payment Setting 1',
			onPress: () => {
				console.log('Payment Setting 1 Pressed');
			},
		},
	];
	const languageSettings = [
		{
			title: 'Language',
			onPress: () => {
				console.log('Language Setting 1 Pressed');
			},
		},
	];
	const supportSettings = [
		{
			title: 'Support/Feedback Setting 1',
			onPress: () => {
				console.log('Support/Feedback Setting 1 Pressed');
			},
		},
	];

	// On logging out, reset the redux store to its initial state, disconnect the socket.io client and sign the user out of their Google Account
	const miscSettings = [
		{
			title: 'Logout',
			onPress: async () => {
				try {
					const isGoogleSignedIn = await googleIsSignedIn();
					if (isGoogleSignedIn) {
						await googleSignOut();
					}

					if (socket.connected) {
						socket.disconnect();
					}

					dispatch(toggleLogIn(false));
					dispatch(
						setCurrentUser({
							username: null,
							accountType: null,
							serviceProviderID: null,
							avatarImageURL: null
						})
					);
				} catch (e) {
					console.log(e);
				}
			},
		},
	];

	return (
		<ScrollView>
			<HorizontalBlock
				blockTitle={'Notifications'}
				appLogo = {require('../../../assets/appsetting1.png')}
				blockElements={notificationSettings}
			></HorizontalBlock>
			<HorizontalBlock
				blockTitle={'Payment'}
				appLogo = {require('../../../assets/appsetting2.png')}
				blockElements={paymentSettings}
			></HorizontalBlock>
			<HorizontalBlock
				blockTitle={'Language'}
				appLogo = {require('../../../assets/appsetting3.png')}
				blockElements={languageSettings}
			></HorizontalBlock>
			<HorizontalBlock
				blockTitle={'Support/Feedback'}
				appLogo = {require('../../../assets/appsetting4.png')}
				blockElements={supportSettings}
			></HorizontalBlock>
			<HorizontalBlock
				blockTitle={'QQueue Version 1.000'}
				appLogo = {require('../../../assets/QQueue_Small.png')}
				blockElements={miscSettings}
				blockElementTitlesStyle={styles.logoutBtn}
			></HorizontalBlock>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	logoutBtn: {
		color: '#E89575',
	},
});

export default AppSettingsScreenContent;
