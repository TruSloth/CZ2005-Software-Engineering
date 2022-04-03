import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import {joinQueue} from '../../services/queue/joinQueue';

import HomeScreenContent from '../../components/organisms/HomeScreenContent';
import {getQueue} from '../../services/queue/getQueue';
import {getNearbyServiceProviders} from '../../services/serviceProviders/getNearbyServiceProviders';

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

	const {data} = useQuery(
		'nearbyLocations',
		async () => {
			const response = await getNearbyServiceProviders();
			return response.data
		}
	);

	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<HomeScreenContent
				navigation={navigation}
				joinServiceProviderQueue={joinServiceProviderQueue}
				nearbyVenuesData={data}
			></HomeScreenContent>
		</SafeAreaView>
	);
};

export default HomeScreen;
