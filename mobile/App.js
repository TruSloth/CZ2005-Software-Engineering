import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AuthNavigator from './src/navigations/auth-navigator';

const App = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<AuthNavigator></AuthNavigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default App;
