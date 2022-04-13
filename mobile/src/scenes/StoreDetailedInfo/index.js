import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	ActivityIndicator
} from 'react-native';

import {
	AppBottomSheet,
	QueueSheetContent,
} from '../../components/molecules/BottomSheet';

import {NOT_IN_QUEUE, QUEUING} from '../../store/account/constants';
import {updateCurrentQueue} from '../../store/account/actions';

import {useMutation, useQueryClient} from 'react-query';
import {joinQueue} from '../../services/queue/joinQueue';
import {useDispatch, useSelector} from 'react-redux';

const {width} = Dimensions.get('window');
const height = (width * 100) / 90;

// TODO: Need to invalidate caches and close queue sheet here, to update the UI and refetch data
const StoreDetailedInfoScreen = ({route}) => {
	const {venueID} = route.params;

	const joinQueueMutation = useMutation(joinQueue);

	const queryClient = useQueryClient();

	const dispatch = useDispatch();

	const [storeDetails, setStoreDetails] = useState({});
	const [images, setImages] = useState([]);

	const updateDetails = useCallback(() => {
		console.log('callback fired');
		const serviceProviderData = queryClient.getQueryData(
			'retrieveServiceProviders'
		);

		const storeDetails = serviceProviderData.find((store) => {
			return store.venueID === venueID;
		});

		if (storeDetails) {
			setImages([storeDetails.imageAddress]);
			setStoreDetails(storeDetails);
		}
	}, [queryClient.getQueryData('retrieveServiceProviders')]);

	useEffect(() => {
		const serviceProviderData = queryClient.getQueryData(
			'retrieveServiceProviders'
		);

		const storeDetails = serviceProviderData.find((store) => {
			return store.venueID === venueID;
		});

		if (storeDetails) {
			setImages([storeDetails.imageAddress]);
			setStoreDetails(storeDetails);
		}

		return () => {
			setStoreDetails({});
		};
	}, [queryClient.getQueryData('retrieveServiceProviders')]);

	const joinServiceProviderQueue = async (user, storeID, storeName, pax) => {
		try {
			const response = await joinQueueMutation.mutateAsync({
				user: user,
				store: storeID,
				pax: pax,
			});

			if (response.status === 200) {
				dispatch(updateCurrentQueue(storeName, storeID, QUEUING));
				closeQueue();
				sheetRef.current.snapTo(2);
				queryClient.invalidateQueries('retrieveNearbyServiceProviders');
				await queryClient.invalidateQueries('retrieveServiceProviders');
				console.log(queryClient.isFetching('retrieveServiceProviders'))
				updateDetails();
			}
		} catch (e) {
			console.log(e);
		}
	};

	const sheetRef = useRef(null);

	const account = useSelector((state) => state.account);

	const openQueue = () => {
		sheetRef.current.snapTo(0);
	};

	const closeQueue = () => {
		sheetRef.current.snapTo(2);
		setQueuePax(0);
	};

	const queueIncrement = () => {
		setQueuePax(queuePax + 1);
	};
	const queueDecrement = () => {
		if (queuePax > 0) {
			setQueuePax(queuePax - 1);
		}
	};

	const onQueueConfirm = () => {
		joinServiceProviderQueue(
			account.userName,
			storeDetails.venueID,
			//storeInfoState.venueID,
			storeDetails.venueName,
			//storeInfoState.venueName,
			queuePax
		);
	};

	const [queuePax, setQueuePax] = useState(0);

	return (
		<View style={styles.container}>
			<Text style={[styles.heading, {color: '#7879F1'}, {fontSize: 25}]}>
				{storeDetails.venueName}
			</Text>
			<ScrollView
				pagingEnabled
				horizontal={true}
				style={{width, height}}
				showsHorizontalScrollIndicator={true}
			>
				{images.map((image, index) => (
					<Image
						key={index}
						source={{uri: image}}
						style={styles.image}
					/>
				))}
			</ScrollView>

			<Text style={styles.waitTimes}>
				Waiting time:
				<Text
					style={styles.imptInfo}
				>{` ${storeDetails.waitTime} mins`}</Text>
			</Text>

			<Text style={styles.desc}>
				There {storeDetails.queueLength === 1 ? 'is ' : 'are '}
				<Text style={styles.imptInfo}>
					{storeDetails.queueLength}{' '}
					{storeDetails.queueLength === 1 ? 'person' : 'people'}
					<Text style={[styles.waitTimes, {fontSize: 20}]}>
						{' '}
						in line{' '}
					</Text>
				</Text>
			</Text>
			<View style={styles.storeDescContainer}>
				<Text style={styles.storeDesc}>
					{storeDetails.venueAddress}
				</Text>
				<Text style={styles.storeDesc}>{storeDetails.venueType}</Text>
				<Text style={styles.storeDesc}>
					{storeDetails.venueRatings === undefined
						? ''
						: storeDetails.venueRatings.$numberDecimal}
					⭐ ({storeDetails.numReviews})
				</Text>
			</View>

			<TouchableOpacity
				style={[
					styles.button,
					{backgroundColor: account.currentQueueID ? 'gray' : ''},
				]}
				onPress={openQueue}
				disabled={account.queueStatus !== NOT_IN_QUEUE}
			>
					<Text
						style={{
							color: account.currentQueueID ? 'red' : '#EF5DA8',
							fontSize: 15,
							fontWeight: 'bold',
						}}
					>
						Queue
					</Text>
			</TouchableOpacity>
			<AppBottomSheet
				ref={sheetRef}
				renderContent={QueueSheetContent}
				onCloseEnd={closeQueue}
				count={queuePax}
				isQueueLoading={queryClient.isFetching('retrieveServiceProviders') === 1}
				onPressPlus={queueIncrement}
				onPressMinus={queueDecrement}
				onPressCancel={closeQueue}
				onPressConfirm={onQueueConfirm}
			></AppBottomSheet>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	scroll: {
		width,
		height,
	},
	pagination: {
		flexDirection: 'row', //align children from left to right
		position: 'absolute',
		bottom: 340,
		alignSelf: 'center',
	},

	waitTimes: {
		fontSize: 15,
		color: '#7879F1',
		fontWeight: 'bold',
		textAlign: 'left',
		width: '80%',
		margin: 20,
	},
	imptInfo: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'red',
	},
	storeDescContainer: {
		margin: 20,
		width: '80%',
		justifyContent: 'space-evenly',
	},
	storeDesc: {
		textAlign: 'justify',
		width: '80%',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#EF5DA8',
	},
	heading: {
		fontSize: 15,
		textAlign: 'left',
		justifyContent: 'flex-start',
		margin: 15,
		fontWeight: 'bold',
	},
	desc: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#7879F1',
		width: '80%',
		textAlign: 'left',
		fontFamily: '',
	},
	button: {
		borderRadius: 10,
		borderWidth: 1,
		padding: 10,
		paddingHorizontal: 50,
		margin: 20,
		borderColor: '#7879F1',
		alignItems: 'center',
		borderRadius: 50,
	},
	image: {
		width,
		// height,
		//justifyContent: "space-around",
		//margin: 30,
		// marginBottom: 20,
		resizeMode: 'cover',
	},
});

export default StoreDetailedInfoScreen;
