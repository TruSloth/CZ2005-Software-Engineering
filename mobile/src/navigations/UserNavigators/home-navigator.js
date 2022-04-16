import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';

import StoreDetailedInfoScreen from '../../scenes/StoreDetailedInfo';
import HomeScreen from '../../scenes/Home';
import AppSettingsScreen from '../../scenes/AppSettings';
import {useSelector} from 'react-redux';

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
		headerTintColor: '#000000',
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
})

export default HomeNavigator;
