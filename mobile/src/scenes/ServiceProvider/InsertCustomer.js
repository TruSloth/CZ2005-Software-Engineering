import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import { InsertCustomerScreenContent } from '../../components/organisms/ServiceProvider';
import { useMutation, useQueryClient } from 'react-query';
import { joinQueue } from '../../services/queue/joinQueue';

const InsertCustomerScreen = ({navigation}) => {

    const addToQueueMutation = useMutation(joinQueue);

    const queryClient = useQueryClient();

    const addUserToQueue = async (user, store, pax) => {
        try {
            const response = await addToQueueMutation.mutateAsync({
                user: user,
                store: store,
                pax: pax
            })

            if (response.status === 200) {
                queryClient.invalidateQueries('getStoreQueue')
                navigation.navigate('BusinessHome')
            }
        } catch(e) {
            console.log(e)
        }
    }

	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<InsertCustomerScreenContent
                insertUserToQueue={addUserToQueue}
				navigation={navigation}
			></InsertCustomerScreenContent>
		</SafeAreaView>
	);
};

export default InsertCustomerScreen;