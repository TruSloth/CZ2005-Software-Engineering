import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider, useSelector} from 'react-redux';
import { QueryClientProvider, QueryClient} from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';

//import store from './src/store';
import storeConfig from './src/store';
import AuthNavigator from './src/navigations/auth-navigator';
import AppNavigator from './src/navigations/app-navigator';

import SplashScreen from './src/scenes/SplashScreen';

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
	const {store, persistor} = storeConfig();

	return (
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<PersistGate loading={<SplashScreen></SplashScreen>} persistor={persistor}>
						<AppWrapper></AppWrapper>
					</PersistGate>
					
				</Provider>
			</QueryClientProvider>
			
	);
};

export default App;
