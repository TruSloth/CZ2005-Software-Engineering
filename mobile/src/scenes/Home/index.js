import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';
import {useMutation, useQueries, useQuery} from 'react-query';
import {useDispatch} from 'react-redux';

import {joinQueue} from '../../services/queue/joinQueue';
import HomeScreenContent from '../../components/organisms/HomeScreenContent';
import {getServiceProviders} from '../../services/serviceProviders/getServiceProviders';
import {getNearbyServiceProviders} from '../../services/serviceProviders/getNearbyServiceProviders';
import {updateCurrentQueue} from '../../store/account/actions';

const HomeScreen = ({navigation}) => {
	const dispatch = useDispatch();
	const joinQueueMutation = useMutation(joinQueue);

	const joinServiceProviderQueue = async (user, store, pax) => {
		try {
			const response = await joinQueueMutation.mutateAsync({
				user: user,
				store: store,
				pax: pax,
			});

			if (response.status === 200) {
				// update store to indicate that user is in queue
				//console.log('Joined a queue!');
				dispatch(updateCurrentQueue(store));
			}
		} catch (e) {
			console.log(e);
		}
	};

	// const {data} = useQuery('retrieveNearbyServiceProviders', async () => {
	// 	const response = await getNearbyServiceProviders();
	// 	return response.data
	// })

	const result = useQueries([
		{
			queryKey: ['retrieveServiceProviders'],
			queryFn: async () => {
				const response = await getServiceProviders();
				return response.data;
			},
		},
		{
			queryKey: ['retrieveNearbyServiceProviders'],
			queryFn: async () => {
				const response = await getNearbyServiceProviders(
					new Date().getHours()
				);
				return response.data;
			},
		},
	]);

	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<HomeScreenContent
				navigation={navigation}
				joinServiceProviderQueue={joinServiceProviderQueue}
				serviceProviderData={
					result[0].isLoading ? null : result[0].data
				}
				//nearbyVenuesData={data}
				nearbyVenuesData={result[1].isLoading ? null : result[1].data}
			></HomeScreenContent>
		</SafeAreaView>
	);
};

export default HomeScreen;
