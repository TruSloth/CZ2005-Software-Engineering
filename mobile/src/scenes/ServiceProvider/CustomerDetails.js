import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import { CustomerDetailsScreenContent } from '../../components/organisms/ServiceProvider';

const CustomerDetailsScreen = ({navigation}) => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<CustomerDetailsScreenContent
				navigation={navigation}
			></CustomerDetailsScreenContent>
		</SafeAreaView>
	);
};

export default CustomerDetailsScreen;