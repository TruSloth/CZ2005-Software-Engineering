import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StoreDetailedInfoScreen from '../scenes/StoreDetailedInfo';
import HomeScreen from '../scenes/Home';

/**
 * Stack navigators for the store info set of screens
 */

const Stack = createNativeStackNavigator();

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
		</Stack.Navigator>
	);
};

export default HomeNavigator;