import React, {useEffect, useRef, useState, useCallback} from 'react';

import {Text, View, StyleSheet, TextInput, Image, ScrollView, RefreshControl} from 'react-native';
import { useQueryClient } from 'react-query';
import TopBanner from '../../molecules/TopBanner';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SearchBar} from 'react-native-elements';
import { useSelector } from 'react-redux';

const ServiceProviderHomeScreenContent = (props) => {
	//export default function App(props) {
	const Input = () => {
		const [text, onChangeText] = React.useState('Useless Text');
		const [number, onChangeNumber] = React.useState(null);
	};

	const {navigation, queueData} = props;

	const settingsOnPress = () => {
		navigation.navigate('AppSettings');
	};
	const BizHomeOnPress = () => {
		navigation.navigate('BusinessHome');
	};

	const BizProfileOnPress = () => {
		navigation.navigate('BusinessProfile');
		console.log('bizproilfe');
	};

	const InsertCustomerOnPress = () => {
		// navigation.navigate('HomePage', {screen: 'StoreDetailedInfo'});
		navigation.navigate('InsertCustomer');
		console.log('insert pressed');
	};

	const CustomerDetailsOnPress = () => {
		navigation.navigate('CustomerDetails', {queueData: queueData});
	};

    const account = useSelector((state) => state.account);

	const [search, setSearch] = useState('');
	const [bannerHeight, setBannerHeight] = useState(0);

    const queryClient = useQueryClient();

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		queryClient.invalidateQueries('getStoreQueue');
		setRefreshing(false);
	}, []);

	const reactNativeLogo = 'https://reactjs.org/logo-og.png';
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

			{/* <SearchBar
				onChangeText={(text) => setSearch(text)}
				value={search}
				platform={Platform.OS === 'ios' ? 'ios' : 'android'}
				onClear={(text) => setSearch('')}
				round={false}
				placeholder={'Search'}
				placeholderTextColor={'#7879F1'}
				containerStyle={[styles.searchBar, {top: bannerHeight + 20}]}
				inputContainerStyle={styles.searchBarInput}
			></SearchBar> */}

			<View
				style={{
					borderBottomColor: '#7879F1',
					borderBottomWidth: 1,
				}}
			/>
			<View style={styles.container2}>
				<View style={{marginBottom: 20}}>
					<View>
						<Text style={styles.subheading}>Active Queue</Text>
					</View>
					<View style={styles.innerContainer}>
						<Text style={styles.queueNo}>{`${queueData.length}`}</Text>
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
						<Text style={styles.subheading}>QQ Customer Count</Text>
					</View>
					<View style={styles.innerContainer}>
						<Text style={styles.queueNo}>150</Text>
						<Image
							style={styles.logo}
							source={require('../../../assets/group.png')}
						/>

						<View style={[styles.buttonList2, {marginLeft: '46%'}]}>
							<TouchableOpacity style={styles.button2}>
								<Text style={styles.textButton}>Details</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>

			<View
				style={{
					borderBottomColor: '#7879F1',
					borderBottomWidth: 1,
				}}
			/>
			<View style={styles.buttonList}>
				<View>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.textButton2}>Publish offers</Text>
					</TouchableOpacity>
				</View>
				<View>
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
		//	paddingTop: Constants.statusBarHeight,
		backgroundColor: 'white',
		padding: 8,
		//alignItems: 'left',
	},
	input: {
		height: 40,
		margin: 12,
		padding: 10,
		borderWidth: 0.5,
		borderRadius: 10,
		borderColor: '#7879F1',
	},
	buttonList: {
		marginTop: '10%',
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
		backgroundColor: 'pink',
		width: '100%',
		height: 40,
		display: 'flex',
	},
	textButton2: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#7879F1',
	},
	bigTextButton: {},
	heading: {
		margin: 10,
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'left',
		justifyContent: 'flex-end',
		position: 'relative',
		color: '#7879F1',
		marginBottom: 10,
		textAlignVertical: 'top',
	},
	container2: {
		//alignItems: 'left',
		padding: 24,
	},

	buttonList2: {
		marginLeft: '55%',
		//marginRight: '90%',
	},

	button2: {
		borderRadius: 5,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderColor: 'transparent',
		alignItems: 'center',
		marginTop: 2,
		marginBottom: 2,
		backgroundColor: 'pink',
		width: 80,
		height: 28,
		display: 'flex',
		marginRight: 5,
	},

	textButton: {
		fontWeight: 'bold',
		fontSize: 13,
		color: '#7879F1',
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
		color: '#7879F1',
	},
	queueNo: {
		marginRight: 10,
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'left',
		color: '#7879F1',
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