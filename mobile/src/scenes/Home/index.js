import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import HomeScreenContent from '../../components/organisms/HomeScreenContent';

const HomeScreen = ({navigation}) => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<HomeScreenContent></HomeScreenContent>
		</SafeAreaView>
	);
};

export default HomeScreen;
