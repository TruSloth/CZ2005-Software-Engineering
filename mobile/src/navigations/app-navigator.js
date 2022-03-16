import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text } from 'react-native';

import ChatScreen from '../scenes/Chat';
import NotificationsScreen from '../scenes/Notifications';

import HomeNavigator from './home-navigator';
import { Icon } from 'react-native-elements';
import AccountNavigator from './account-navigator';

/**
 * Tab navigator for main application
 */

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                switch (route.name) {
                    case 'Home':
                        iconName = 'home-filled'
                        break;
                    case 'Chat':
                        iconName = 'chat'
                        break;
                    case 'Notifications':
                        iconName = 'notifications'
                        break;
                    case 'Account':
                        iconName = 'person'
                        break;
                    default:
                        break;
                }
        
                return <Icon name={iconName} color={focused ? "#5D5FEF" : "#A5A6F6"}></Icon>
            },
            tabBarLabel: ({focused, color}) => {
                const textColor = focused ? "#5D5FEF" : "#A5A6F6"

                return <Text style={{color: textColor, fontSize: 10}}>{route.name}</Text>
            },
            tabBarButton: props => <TouchableOpacity {...props}></TouchableOpacity>,
            tabBarHideOnKeyboard: true,
            tabBarItemStyle: {borderTopColor: '#7879F1'},
            lazy: false
        })}>
            <Tab.Group>
                <Tab.Screen name="Home" component={HomeNavigator} options={{headerShown: false}}></Tab.Screen>
                <Tab.Screen name="Chat" component={ChatScreen} ></Tab.Screen>
                <Tab.Screen name="Notifications" component={NotificationsScreen} ></Tab.Screen>
                <Tab.Screen name="Account" component={AccountNavigator} options={{headerShown: false}}></Tab.Screen>
            </Tab.Group>          
        </Tab.Navigator>
    )
}

export default AppNavigator;
