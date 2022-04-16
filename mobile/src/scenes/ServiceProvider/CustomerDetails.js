import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';
import { advanceQueue } from '../../services/queue/advanceQueue';
import { useMutation, useQueryClient } from 'react-query';

import { CustomerDetailsScreenContent } from '../../components/organisms/ServiceProvider';

const CustomerDetailsScreen = ({navigation, route}) => {

	const advanceQueueMutation = useMutation(advanceQueue);

	const queryClient = useQueryClient();

	const pushFromQueue = async (venueID, userName) => {
		try {
            const response = await advanceQueueMutation.mutateAsync({
                userName: userName,
				venueID: venueID
            })

            if (response.status === 200) {
                queryClient.invalidateQueries('getStoreQueue')
            }
        } catch(e) {
            console.log(e)
        }
	}

	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<CustomerDetailsScreenContent
				navigation={navigation}
				pushFromQueue={pushFromQueue}
				queueData={route.params.queueData}
			></CustomerDetailsScreenContent>
		</SafeAreaView>
	);
};

export default CustomerDetailsScreen;