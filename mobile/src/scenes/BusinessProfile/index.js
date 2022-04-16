import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import BusinessProfileContent from '../../components/organisms/BusinessProfileContent';

const BusinessProfileScreen = ({navigation}) => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<BusinessProfileContent
				navigation={navigation}
			></BusinessProfileContent>
		</SafeAreaView>
	);
};

export default BusinessProfileScreen;
