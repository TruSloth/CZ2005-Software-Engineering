import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import store from './src/store';
import {Provider, useSelector} from 'react-redux';
import { QueryClientProvider, QueryClient} from 'react-query';

import AuthNavigator from './src/navigations/auth-navigator';
import AppNavigator from './src/navigations/app-navigator';

const queryClient = new QueryClient();

const AppWrapper = () => {
	const auth = useSelector((state) => state.auth);

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{flex: 1}}>
			<NavigationContainer>
				{auth.isLoggedIn ? (
					<AppNavigator></AppNavigator>					
				) : (
					<AuthNavigator></AuthNavigator>
				)}
			</NavigationContainer>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	);
};

const App = () => {
	return (
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<AppWrapper></AppWrapper>
				</Provider>
			</QueryClientProvider>
			
	);
};

export default App;
