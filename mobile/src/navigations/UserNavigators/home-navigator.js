import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';

import StoreDetailedInfoScreen from '../../scenes/StoreDetailedInfo';
import HomeScreen from '../../scenes/Home';
import AppSettingsScreen from '../../scenes/AppSettings';
import RewardsScreen from '../../scenes/Rewards';


const Stack = createNativeStackNavigator();

/**
 * Stack navigators for the **home** set of screens
 *
 * Controls navigation for `HomeScreen`, `StoreDetailedInfoScreen`, `AppSettingsScreen`.
 *
 * @category Navigations
 * @exports HomeNavigator
 *
 */

const HomeNavigator = () => {
	return (
		<Stack.Navigator initialRouteName='HomePage' screenOptions={styles.homeNavigatorScreenOptions}>
			<Stack.Screen
				name='HomePage'
				component={HomeScreen}
				options={styles.homeScreenOptions}
			></Stack.Screen>
			<Stack.Screen
				name='StoreDetailedInfo'
				component={StoreDetailedInfoScreen}
				options={({route, navigation}) => {
					return {
						title: route.params === undefined ? 'Undefined' : route.params.venueName,
						}}}
			></Stack.Screen>
			<Stack.Screen
				name='AppSettings'
				component={AppSettingsScreen}
				options={styles.appSettingsScreenOptions}
			></Stack.Screen>
			<Stack.Screen
				name='Rewards'
				component={RewardsScreen}
				options={styles.rewardsScreenOptions}
			></Stack.Screen>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	homeNavigatorScreenOptions: {
		headerStyle: {
			backgroundColor: '#FCDDEC',
			width: 10
		},
		headerTitleAlign: 'center',
		headerTintColor: '#EF5DA8',

		headerTitleStyle: {color: '#000000'},
		headerShadowVisible: false,
	},

	homeScreenOptions: {
		headerShown: false
	},
	appSettingsScreenOptions: {
		title: 'App Settings',
		headerStyle: {
			backgroundColor: '#FFFFFF'
		},
	},
	rewardsScreenOptions: {
		title: 'QQueue Rewards',
		headerStyle: {
			backgroundColor: '#FFFFFF'
		},
	},
})

export default HomeNavigator;
