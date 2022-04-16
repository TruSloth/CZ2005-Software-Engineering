import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AccountScreen from '../../scenes/Account';
import HistoryScreen from '../../scenes/History';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

/**
 * Stack navigator for the **account** set of screens.
 *
 * Controls navigation for `AccountScreen` and `HistoryScreen`.
 *
 * @category Navigations
 * @exports AccountNavigator
 *
 */

const AccountNavigator = () => {
	const account = useSelector((state) => state.account);

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
				options={styles.historyScreenOptions}
			></Stack.Screen>
			{/* <Stack.Screen
				name='BusinessProfile'
				component={BusinessProfileScreen}
				options={styles.historyScreenOptions}
			></Stack.Screen> */}
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	historyScreenOptions: {
		headerTitleAlign: 'center',
		headerTintColor: '#EF5DA8',
		headerTitleStyle: {color: '#7879F1'},
		headerShadowVisible: false,
	},
});

export default AccountNavigator;
