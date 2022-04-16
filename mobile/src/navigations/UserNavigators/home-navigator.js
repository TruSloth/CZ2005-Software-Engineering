import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';

import StoreDetailedInfoScreen from '../../scenes/StoreDetailedInfo';
import HomeScreen from '../../scenes/Home';
import AppSettingsScreen from '../../scenes/AppSettings';
import { useSelector } from 'react-redux';

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
		<Stack.Navigator initialRouteName='HomePage'>
			<Stack.Screen
				name='HomePage'
				component={HomeScreen}
				options={{
					headerShown: false,
				}}
			></Stack.Screen>
			<Stack.Screen
				name='StoreDetailedInfo'
				component={StoreDetailedInfoScreen}
				options={{title: ''}}
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
	appSettingsScreenOptions: {
		title: 'App Settings',
		headerTitleAlign: 'center',
		headerTintColor: '#EF5DA8',
		headerTitleStyle: {color: '#000000'},
		headerShadowVisible: false,
	},
})

export default HomeNavigator;