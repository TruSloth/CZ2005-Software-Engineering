import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';
import {useMutation, useQueries, useQuery} from 'react-query';
import {joinQueue} from '../../services/queue/joinQueue';

import HomeScreenContent from '../../components/organisms/HomeScreenContent';
import {getQueue} from '../../services/queue/getQueue';
import {getServiceProviders} from '../../services/serviceProviders/getServiceProviders';
import GetLocation from 'react-native-get-location';
import { isPointWithinRadius } from 'geolib';
import { getNearbyServiceProviders } from '../../services/serviceProviders/getNearbyServiceProviders';

const HomeScreen = ({navigation}) => {
	const joinQueueMutation = useMutation(joinQueue);

	const joinServiceProviderQueue = async (user, store, pax) => {
		try {
			const response = await joinQueueMutation.mutateAsync({
				user: user,
				store: store,
				pax: pax
			});

			if (response.status === 200) {
				// update store to indicate that user is in queue
				//console.log('Joined a queue!');
			}
		} catch (e) {
			console.log(e);
		}
	};

	// const {data} = useQuery('retrieveNearbyServiceProviders', async () => {
	// 	const response = await getNearbyServiceProviders();
	// 	return response.data
	// })

	const result = useQueries(
		[
			{
				queryKey: ['retrieveServiceProviders'], 
				queryFn: async () => {
					const response = await getServiceProviders();
					return response.data
				}
			},
			{
				queryKey: ['retrieveNearbyServiceProviders'], 
				queryFn: async () => {
					const response = await getNearbyServiceProviders();
					return response.data
				}
			}
		]
	)
	
	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<HomeScreenContent
				navigation={navigation}
				joinServiceProviderQueue={joinServiceProviderQueue}
				serviceProviderData={result[0].isLoading ? null : result[0].data}
				//nearbyVenuesData={data}
				nearbyVenuesData={result[1].isLoading ? null : result[1].data}
			></HomeScreenContent>
		</SafeAreaView>
	);
};

export default HomeScreen;
