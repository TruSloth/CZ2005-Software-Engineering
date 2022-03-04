import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../scenes/Login';
import RegistrationScreen from '../scenes/Registration';
import OnboardingScreen from '../scenes/Onboarding';
import TempVerifyScreen from '../scenes/TempVerify';
import {useSelector} from 'react-redux';

/**
 * Stack navigators for the authentication set of screens
 */

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
	const auth = useSelector((state) => state.auth);

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
		</Stack.Navigator>
	);
};

export default AuthNavigator;
