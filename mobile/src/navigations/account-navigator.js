import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AccountScreen from '../scenes/Account';
import HistoryScreen from '../scenes/History';

/**
 * Stack navigators for the account set of screens
 */

const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
	return (
		<Stack.Navigator initialRouteName='UserAccount'>
			<Stack.Screen
				name='UserAccount'
				component={AccountScreen}
				options={{
					headerShown: false,
				}}
			></Stack.Screen>
			<Stack.Screen
				name='History'
				component={HistoryScreen}
				options={{
					headerTitleAlign: 'center',
                    headerTintColor: '#EF5DA8',
					headerTitleStyle: {color: '#7879F1'},
                    headerShadowVisible: false
				}}
			></Stack.Screen>
		</Stack.Navigator>
	);
};

export default AccountNavigator;
