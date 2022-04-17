import React, {useState, useCallback} from 'react';

import {
	Text,
	View,
	StyleSheet,
	Image,
	ScrollView,
	RefreshControl,
} from 'react-native';
import {useQueryClient} from 'react-query';
import TopBanner from '../../molecules/TopBanner';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

/**
 * Renders the content for the ServiceProviderHome Screen on the ServiceProvider UI.
 *
 * @category Components
 * @exports ServiceProviderHomeScreenContent
 * @subcategory Organisms
 *
 * @property {object(user, venueID, queueNumber, pax)[]} queueData
 * The data for the users currently in the queue.
 * 
 * Each entry must contain data on `user`, `venueID`, `queueNumber`, and `pax`. 
 */
const ServiceProviderHomeScreenContent = (props) => {
	const {navigation, queueData} = props;

	const settingsOnPress = () => {
		navigation.navigate('AppSettings');
	};
	const BizHomeOnPress = () => {
		navigation.navigate('BusinessHome');
	};

	const BizProfileOnPress = () => {
		navigation.navigate('BusinessProfile');
	};

	const InsertCustomerOnPress = () => {
		navigation.navigate('InsertCustomer');
	};

	const CustomerDetailsOnPress = () => {
		navigation.navigate('CustomerDetails', {queueData: queueData});
	};

	const account = useSelector((state) => state.account);

	const [bannerHeight, setBannerHeight] = useState(0);

	const queryClient = useQueryClient();

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		queryClient.invalidateQueries('getStoreQueue');
		setRefreshing(false);
	}, []);

	return (
        <ScrollView
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            ></RefreshControl>
        }
        >
            <View style={styles.container1}>
			<TopBanner
				title={`Hi, ${account.userName}!`}
				subtitle={''}
				avatarImage={account.avatarImageURL !== null  ? {uri: account.avatarImageURL} : account.avatarImage}
				settingsOnPress={settingsOnPress}
				BizHomeonPress={BizHomeOnPress}
				BizProfileOnPress={BizProfileOnPress}
				actionBar={true}
				style={[styles.homeBanner, {marginBottom: '5%'}]}
				onLayout={(e) => {
					e.persist();
					setBannerHeight(
						e && e.nativeEvent ? e.nativeEvent.layout.height : 0
					);
				}}
			></TopBanner>

				<View
					style={{
						borderBottomColor: '#AAAAAA',
						borderBottomWidth: 1,
					}}
				/>
				<View style={styles.container2}>
					<View style={{marginBottom: 20}}>
						<View>
							<Text style={styles.subheading}>Active Queue</Text>
						</View>
						<View style={styles.innerContainer}>
							<Text
								style={styles.queueNo}
							>{`${queueData.length}`}</Text>
							<Image
								style={styles.logo}
								source={require('../../../assets/group.png')}
							/>

							<View style={styles.buttonList2}>
								<View>
									<TouchableOpacity
										style={styles.button2}
										onPress={InsertCustomerOnPress}
									>
										<Text style={styles.textButton}>
											Insert
										</Text>
									</TouchableOpacity>
								</View>
								<View>
									<TouchableOpacity
										style={styles.button2}
										onPress={CustomerDetailsOnPress}
									>
										<Text style={styles.textButton}>
											Remove
										</Text>
									</TouchableOpacity>
								</View>
								<View>
									<TouchableOpacity
										style={styles.button2}
										onPress={CustomerDetailsOnPress}
									>
										<Text style={styles.textButton}>
											Details
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>

					<View>
						<View>
							<Text style={styles.subheading}>
								QQ Customer Count
							</Text>
						</View>
						<View style={styles.innerContainer}>
							<Text style={styles.queueNo}>150</Text>
							<Image
								style={styles.logo}
								source={require('../../../assets/group.png')}
							/>

							<View
								style={[
									styles.buttonList2,
									{marginLeft: '46%'},
								]}
							>
								<TouchableOpacity style={styles.button2}>
									<Text style={styles.textButton}>
										Details
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>

				<View
					style={{
						borderBottomColor: '#AAAAAA',
						borderBottomWidth: 1,
					}}
				/>

				<View style={styles.buttonList}>
					<View>
						<TouchableOpacity style={styles.button}>
							<Text style={styles.textButton2}>
								Publish offers
							</Text>
						</TouchableOpacity>
					</View>
					<View style={{marginBottom: 100}}>
						<TouchableOpacity style={styles.button}>
							<Text style={styles.textButton2}>Close Queue</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container1: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white',
		padding: 8,
	},
	sqaure: {
		alignSelf: 'center',
		height: 265,
		flex: 1,
		width: 400,
		backgroundColor: '#FFF8FA',
		resizeMode: 'cover',
		marginBottom: 10,
	},
	input: {
		height: 40,
		margin: 12,
		padding: 10,
		borderWidth: 0.5,
		borderRadius: 10,
		borderColor: '#000000',
	},
	buttonList: {
		marginTop: '30%',
		margin: 5,
		justifyContent: 'center',
	},
	button: {
		borderRadius: 5,
		borderWidth: 1,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderColor: 'transparent',
		alignItems: 'center',
		marginTop: 10,
		backgroundColor: '#FCDDEC',
		width: '100%',
		height: 40,
		display: 'flex',
	},
	textButton2: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#000000',
	},
	heading: {
		margin: 10,
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'left',
		justifyContent: 'flex-end',
		position: 'relative',
		color: '#000000',
		marginBottom: 10,
		textAlignVertical: 'top',
	},
	container2: {
		padding: 24,
	},

	buttonList2: {
		marginLeft: '55%',
	},

	button2: {
		borderRadius: 5,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderColor: 'transparent',
		alignItems: 'center',
		marginTop: 2,
		marginBottom: 2,
		backgroundColor: '#FCDDEC',
		width: 80,
		height: 28,
		display: 'flex',
		marginRight: 5,
	},

	textButton: {
		fontWeight: 'bold',
		fontSize: 13,
		color: '#000000',
	},
	innerContainer: {
		justifyContent: 'flex-start',
		flexDirection: 'row',
		textAlign: 'left',
	},

	subheading: {
		//active queue
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'left',
		color: '#000000',
	},
	queueNo: {
		marginRight: 10,
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'left',
		color: '#E89575',
		marginBottom: 10,
	},

	logo: {
		height: 50,
		width: 50,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
	},

	searchBar: {
		marginHorizontal: 20,
		borderRadius: 10,
		position: 'absolute',
		width: '90%',
		elevation: 5,
		zIndex: 1,
		height: 50,
		justifyContent: 'center',
	},
});
export default ServiceProviderHomeScreenContent;
