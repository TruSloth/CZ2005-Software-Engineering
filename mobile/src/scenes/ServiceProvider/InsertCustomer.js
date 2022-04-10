import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import { InsertCustomerScreenContent } from '../../components/organisms/ServiceProvider';

const InsertCustomerScreen = ({navigation}) => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<InsertCustomerScreenContent
				navigation={navigation}
			></InsertCustomerScreenContent>
		</SafeAreaView>
	);
};

export default InsertCustomerScreen;