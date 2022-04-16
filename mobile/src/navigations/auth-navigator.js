import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../scenes/Login';
import RegistrationScreen from '../scenes/Registration';
import OnboardingScreen from '../scenes/Onboarding/';
import TempVerifyScreen from '../scenes/TempVerify';
import {
	ServiceProviderLoginScreen,
	ServiceProviderRegistrationScreen,
} from '../scenes/ServiceProvider';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

/**
 * Stack navigators for the **authentication** set of screens
 *
 * Controls navigation for `OnboardingScreen`, `RegistrationScreen`, `LoginScreen` and `TempVerifyScreen`.
 *
 * @category Navigations
 * @exports AuthNavigator
 *
 */

const AuthNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{headerShown: false}}
			initialRouteName='Onboarding'
		>
			<Stack.Screen
				name='Onboarding'
				component={OnboardingScreen}
			></Stack.Screen>
			<Stack.Screen
				name='Verification'
				component={TempVerifyScreen}
			></Stack.Screen>
			<Stack.Screen
				name='Registration'
				component={RegistrationScreen}
			></Stack.Screen>
			<Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
			<Stack.Screen
				name='ServiceProviderRegistration'
				component={ServiceProviderRegistrationScreen}
			></Stack.Screen>
			<Stack.Screen
				name='ServiceProviderLogin'
				component={ServiceProviderLoginScreen}
			></Stack.Screen>
			<Stack.Screen
				name='BusinessHome'
				component={ServiceProviderHomeScreen}
			></Stack.Screen>
		</Stack.Navigator>
	);
};

export default AuthNavigator;
