
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider, useSelector} from 'react-redux';
import { QueryClientProvider, QueryClient} from 'react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { GOOGLE_WEBCLIENT_ID } from './src/services/config';
import storeConfig from './src/store';
import AuthNavigator from './src/navigations/auth-navigator';
import AppNavigator from './src/navigations/app-navigator';

import SplashScreen from './src/scenes/SplashScreen';

const queryClient = new QueryClient();

const AppWrapper = () => {
	const account = useSelector((state) => state.account);

	return (
		<SafeAreaProvider>
			<GestureHandlerRootView style={{flex: 1}}>
			<NavigationContainer>
				{account.isLoggedIn ? (
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

	GoogleSignin.configure({
		webClientId: GOOGLE_WEBCLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
		offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
	  });

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
