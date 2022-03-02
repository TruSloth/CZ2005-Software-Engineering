import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import store from './src/store';
import {Provider, useSelector} from 'react-redux';

import AuthNavigator from './src/navigations/auth-navigator';
import AppNavigator from './src/navigations/app-navigator';

const AppWrapper = () => {
	const auth = useSelector(state => state.auth);

	return (
			<SafeAreaProvider>
				<NavigationContainer>
					{auth.isLoggedIn ? (
						(
						<AppNavigator></AppNavigator>
						)
					) : (
						<AuthNavigator></AuthNavigator>
					)}
				</NavigationContainer>
			</SafeAreaProvider>
	);
};

const App = () => {
	return (
		<Provider store={store}>
			<AppWrapper></AppWrapper>
		</Provider>
	)
}

export default App;
