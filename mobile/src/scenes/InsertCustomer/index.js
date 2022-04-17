import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import InsertCustomerContent from '../../components/organisms/InsertCustomerContent';

const InsertCustomerScreen = ({navigation}) => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<InsertCustomerContent
				navigation={navigation}
			></InsertCustomerContent>
		</SafeAreaView>
	);
};

export default InsertCustomerScreen;
