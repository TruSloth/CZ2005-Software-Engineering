import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import {joinQueue} from '../../services/queue/joinQueue';

import HomeScreenContent from '../../components/organisms/HomeScreenContent';
import {getQueue} from '../../services/queue/getQueue';

const HomeScreen = ({navigation}) => {
	const joinQueueMutation = useMutation(joinQueue);

	const joinServiceProviderQueue = async (user, store) => {
		console.log(store);
		try {
			const response = await joinQueueMutation.mutateAsync({
				user: user,
				store: store,
			});

			if (response.status === 200) {
				console.log('Joined a queue!');
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<HomeScreenContent
				navigation={navigation}
				joinServiceProviderQueue={joinServiceProviderQueue}
			></HomeScreenContent>
		</SafeAreaView>
	);
};

export default HomeScreen;
