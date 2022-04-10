import React, {useState, useRef} from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	ScrollView,
	Dimensions,
} from 'react-native';

import {
	AppBottomSheet,
	QueueSheetContent,
} from '../../components/molecules/BottomSheet';

import {useMutation} from 'react-query';
import {joinQueue} from '../../services/queue/joinQueue';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');
const height = (width * 100) / 90;

const StoreDetailedInfoScreen = ({route}) => {
	const {storeInformation} = route.params;

	const images = [storeInformation.imageAddress];

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
			storeInformation.venueID,
			queuePax
		);
	};

	const [queuePax, setQueuePax] = useState(0);

	return (
		<View style={styles.container}>
			<Text style={[styles.heading, {color: '#7879F1'}, {fontSize: 25}]}>
				{storeInformation.venueName}
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
				<Text style={styles.imptInfo}>{` ${storeInformation.waitTime} mins`}</Text>
			</Text>

			<Text style={styles.desc}>
				There {storeInformation.queueLength === 1 ? 'is ' : 'are '} 
				<Text style={styles.imptInfo}>
					{storeInformation.queueLength} {storeInformation.queueLength === 1  ? 'person' : 'people'}
					<Text style={[styles.waitTimes, {fontSize: 20}]}>
						{' '}
						in line{' '}
					</Text>
				</Text>
			</Text>
			<View style={styles.storeDescContainer}>
				<Text style={styles.storeDesc}>
					{storeInformation.venueAddress}
				</Text>
				<Text style={styles.storeDesc}>
					{storeInformation.venueType}
				</Text>
				<Text style={styles.storeDesc}>
					{storeInformation.venueRatings.$numberDecimal}⭐ (
					{storeInformation.numReviews})
				</Text>
			</View>

			<TouchableOpacity style={styles.button} onPress={openQueue}>
				<Text
					style={{color: '#EF5DA8', fontSize: 15, fontWeight: 'bold'}}
				>
					Queue
				</Text>
			</TouchableOpacity>
			<AppBottomSheet
				ref={sheetRef}
				renderContent={QueueSheetContent}
				onCloseEnd={closeQueue}
				count={queuePax}
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
