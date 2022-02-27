import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegistrationScreen, OnboardingScreen } from './screens/index';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};



export default App;
