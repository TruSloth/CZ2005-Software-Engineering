import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';

import AppSettingsScreen from '../../scenes/AppSettings';
import { ServiceProviderHomeScreen, InsertCustomerScreen, CustomerDetailsScreen, ServiceProviderProfileScreen} from '../../scenes/ServiceProvider';

/**
 * Stack navigators for the **ServiceProvider** set of screens
 *
 * Controls navigation for `ServiceProviderHomeScreen`, `InsertCustomerScreen`, `AppSettingsScreen`, `CustomerDetailsScreen` and `ServiceProviderProfileScreen`.
 *
 * @category Navigations
 * @exports HomeNavigator
 *
 */

const Stack = createNativeStackNavigator();

const ServiceProviderHomeNavigator = () => {
	return (
		<Stack.Navigator initialRouteName='BusinessHome'>
			<Stack.Screen
				name='BusinessHome'
				component={ServiceProviderHomeScreen}
				options={{
					headerShown: false,
				}}
			></Stack.Screen>
			<Stack.Screen
				name='InsertCustomer'
				component={InsertCustomerScreen}
				options={{title: ''}}
			></Stack.Screen>
			<Stack.Screen
				name='AppSettings'
				component={AppSettingsScreen}
				options={styles.appSettingsScreenOptions}
			></Stack.Screen>
			<Stack.Screen
				name='CustomerDetails'
				component={CustomerDetailsScreen}
				options={{title: ''}}
			></Stack.Screen>
			<Stack.Screen
				name='BusinessProfile'
				component={ServiceProviderProfileScreen}
				options={{title: ''}}
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
});

export default ServiceProviderHomeNavigator;