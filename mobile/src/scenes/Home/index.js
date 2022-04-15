import React from 'react';

import {SafeAreaView, StatusBar} from 'react-native';
import {useMutation, useQueries, useQuery, useQueryClient} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';

import {joinQueue} from '../../services/queue/joinQueue';
import HomeScreenContent from '../../components/organisms/HomeScreenContent';
import {getServiceProviders} from '../../services/serviceProviders/getServiceProviders';
import {getNearbyServiceProviders} from '../../services/serviceProviders/getNearbyServiceProviders';
import {updateCurrentQueue} from '../../store/account/actions';
import {getQueueWaitTime} from '../../services/queue/getQueueWaitTime';
import {leaveQueue} from '../../services/queue/leaveQueue';
import {getRecommendedServiceProviders} from '../../services/serviceProviders/getRecommendedServiceProviders';
import {NOT_IN_QUEUE, QUEUING} from '../../store/account/constants';

const HomeScreen = ({navigation}) => {
	const dispatch = useDispatch();
	const account = useSelector((state) => state.account);

	const socket = useSelector((state) => state.socket).socket;

	const queryClient = useQueryClient();
	const joinQueueMutation = useMutation(joinQueue);
	const leaveQueueMutation = useMutation(leaveQueue);

	const joinServiceProviderQueue = async (user, storeID, storeName, pax) => {
		try {
			const response = await joinQueueMutation.mutateAsync({
				user: user,
				store: storeID,
				pax: pax,
			});

			if (response.status === 200) {
				dispatch(updateCurrentQueue(storeName, storeID, QUEUING));
			}
		} catch (e) {
			console.log(e);
		}
	};

	// When the user leaves the queue on their own accord
	const leaveServiceProviderQueue = async () => {
		try {
			const response = await leaveQueueMutation.mutateAsync({
				userName: account.userName,
				venueID: account.currentQueueID,
			});

			if (response.status === 200) {
				dispatch(updateCurrentQueue(null, null, NOT_IN_QUEUE));
				queryClient.invalidateQueries('retrieveNearbyServiceProviders');
				queryClient.invalidateQueries('retrieveServiceProviders');
			}
		} catch (e) {
			console.log(e);
		}
	};

	const result = useQueries([
		{
			queryKey: ['retrieveServiceProviders'],
			queryFn: async () => {
				const response = await getServiceProviders(
					new Date().getHours()
				);
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
		{
			queryKey: ['retrieveWaitTime'],
			queryFn: async () => {
				const response = await getQueueWaitTime(
					account.currentQueueID,
					new Date().getHours()
				);
				return response.data;
			},
			refetchInterval: 60000,
			enabled: account.queueStatus !== NOT_IN_QUEUE,
		},
		{
			queryKey: ['retrieveRecommendedServiceProviders'],
			queryFn: async () => {
				const response = await getRecommendedServiceProviders(
					account.userName
				);
				return response.data;
			},
		},
	]);

	// Display loading icons

	return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<HomeScreenContent
				navigation={navigation}
				joinServiceProviderQueue={joinServiceProviderQueue}
				leaveServiceProviderQueue={leaveServiceProviderQueue}
				serviceProviderData={
					result[0].isLoading ? null : result[0].data
				}
				nearbyVenuesData={result[1].isLoading ? null : result[1].data}
				currentQueueWaitTime={
					result[2].isLoading || result[2].isIdle
						? null
						: result[2].data.waitTime
				}
				recommendedServiceProviders={
					result[3].isLoading ? null : result[3].data
				}
			></HomeScreenContent>
		</SafeAreaView>
	);
};

export default HomeScreen;
