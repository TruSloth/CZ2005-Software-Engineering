import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import { ServiceProviderHomeScreenContent } from '../../components/organisms/ServiceProvider';

const ServiceProviderHomeScreen = ({navigation}) => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<ServiceProviderHomeScreenContent
				navigation={navigation}
			></ServiceProviderHomeScreenContent>
		</SafeAreaView>
	);
};

export default ServiceProviderHomeScreen;