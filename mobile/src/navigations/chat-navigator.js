import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatScreen from '../scenes/Chat';
import {StyleSheet} from 'react-native';

/**
 * Stack navigators for the account set of screens
 */

const Stack = createNativeStackNavigator();

const ChatNavigator = () => {
	return (
		<Stack.Navigator initialRouteName='LiveChat'>
			<Stack.Screen
				name='LiveChat'
				component={ChatScreen}
				options={styles.chatScreenOptions}
			></Stack.Screen>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	chatScreenOptions: {
        title: 'Location 1',
		headerTitleAlign: 'center',
		headerTintColor: '#EF5DA8',
		headerTitleStyle: {color: '#7879F1'},
		headerShadowVisible: false,
	},
});

export default ChatNavigator;
