import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import AppSettingsScreenContent from '../../components/organisms/AppSettingsScreenContent';

const AppSettingsScreen = ({navigation}) => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<AppSettingsScreenContent navigation={navigation}></AppSettingsScreenContent>
		</SafeAreaView>
	);
};

export default AppSettingsScreen;