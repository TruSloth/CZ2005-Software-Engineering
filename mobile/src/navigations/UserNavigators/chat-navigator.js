import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatScreen from '../../scenes/Chat';
import {StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

/**
 * Stack navigators for the **chat** set of screens
 * 
 * Controls navigation for `ChatScreen`.
 * 
 * @category Navigations
 * @exports ChatNavigator
 * 
 */

const ChatNavigator = () => {
	return (
		<Stack.Navigator initialRouteName='LiveChat'>
			<Stack.Screen
				name='LiveChat'
				component={ChatScreen}
				options={(route, navigation) => {
					console.log(route)

					return {...styles.chatScreenOptions,
						title: route.params === undefined ? 'General' : route.params.venueName
						}
				}}
			></Stack.Screen>
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	chatScreenOptions: {
		headerTitleAlign: 'center',
		headerTintColor: '#EF5DA8',
		headerTitleStyle: {color: '#7879F1'},
		headerShadowVisible: false,
	},
});

export default ChatNavigator;
