import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getQueue } from '../../services/queue/getQueue';

import { ServiceProviderHomeScreenContent } from '../../components/organisms/ServiceProvider';

const ServiceProviderHomeScreen = ({navigation}) => {

    const account = useSelector((state) => state.account)

    const {data, isLoading} = useQuery('getStoreQueue', async () => {
        const response = await getQueue(account.serviceProviderID);
        return response.data
    })
    
	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<ServiceProviderHomeScreenContent
				navigation={navigation}
                queueData={isLoading ? [] : data}
			></ServiceProviderHomeScreenContent>
		</SafeAreaView>
	);
};

export default ServiceProviderHomeScreen;