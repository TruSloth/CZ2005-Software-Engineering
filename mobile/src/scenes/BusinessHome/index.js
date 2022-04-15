import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import BusinessHomeScreenContent from '../../components/organisms/BusinessHomeScreenContent';

const BusinessHomeScreen = ({navigation}) => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<BusinessHomeScreenContent
				navigation={navigation}
			></BusinessHomeScreenContent>
		</SafeAreaView>
	);
};

export default BusinessHomeScreen;
