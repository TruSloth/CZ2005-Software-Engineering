import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import { useDispatch } from 'react-redux';

import { googleIsSignedIn, googleSignOut } from '../../../services/auth/google/googleSignIn';
import { setCurrentUser, toggleLogIn } from '../../../store/account/actions';
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
	const languageSettings = [{
        title: 'Language Setting 1',
        onPress: () => {
            console.log('Language Setting 1 Pressed');
        },
    },];
	const supportSettings = [{
        title: 'Support/Feedback Setting 1',
        onPress: () => {
            console.log('Support/Feedback Setting 1 Pressed');
        },
    },];
	const miscSettings = [{
        title: 'Logout',
        onPress: async () => {
			try {
				const isGoogleSignedIn = await googleIsSignedIn();
				if (isGoogleSignedIn) {
					await googleSignOut();
				}

				dispatch(toggleLogIn(false))
				dispatch(setCurrentUser({username: null, accountType: null}))
			} catch (e) {
				console.log(e)
			}
        },
    },];

	return (
		<ScrollView>
			<HorizontalBlock
				blockTitle={'Notifications'}
				blockElements={notificationSettings}
			></HorizontalBlock>
			<HorizontalBlock
				blockTitle={'Payment'}
				blockElements={paymentSettings}
			></HorizontalBlock>
			<HorizontalBlock
				blockTitle={'Language'}
				blockElements={languageSettings}
			></HorizontalBlock>
			<HorizontalBlock
				blockTitle={'Support/Feedback'}
				blockElements={supportSettings}
			></HorizontalBlock>
			<HorizontalBlock
				blockTitle={'App Name App Version 1.0'}
				blockElements={miscSettings}
				blockElementTitlesStyle={styles.logoutBtn}
			></HorizontalBlock>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	logoutBtn: {
		color: '#EF5DA8',
	},
});

export default AppSettingsScreenContent;
