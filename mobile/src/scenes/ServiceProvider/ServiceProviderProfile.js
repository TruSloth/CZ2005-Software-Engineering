import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import { ServiceProviderProfileScreenContent } from '../../components/organisms/ServiceProvider';

const ServiceProviderProfileScreen = ({navigation}) => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<ServiceProviderProfileScreenContent
				navigation={navigation}
			></ServiceProviderProfileScreenContent>
		</SafeAreaView>
	);
};

export default ServiceProviderProfileScreen;