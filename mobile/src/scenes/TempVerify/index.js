import React, {useState} from 'react';
import {
	Image,
	TouchableOpacity,
	StyleSheet,
	StatusBar,
	Text,
	TextInput,
	SafeAreaView,
	useColorScheme,
	View,
	ActivityIndicator,
} from 'react-native';
import {Card} from 'react-native-paper';
import InputField from '../../components/atoms/InputField';

import {useDispatch, useSelector} from 'react-redux';

import {useMutation} from 'react-query';

import {verify} from '../../services/auth/verify';
import {setCurrentUser, toggleLogIn} from '../../store/account/actions';

const TempVerifyScreen = ({route}) => {
	const {tempUserName, accountType} = route.params;

	const dispatch = useDispatch();

	const socket = useSelector((state) => state.socket).socket;
	const account = useSelector((state) => state.account);

	const verifyMutation = useMutation(verify);

	const isLoading = verifyMutation.isLoading;

	const [authid, setAuthid] = useState('');

	const onPressHandler = async () => {
		try {
			const response = await verifyMutation.mutateAsync({
				tempUserName: tempUserName,
				verificationCode: authid,
			});

			if (response.status === 200) {
				if (accountType === 'User') {
					dispatch(
						setCurrentUser({
							userName: tempUserName,
							accountType: accountType,
							serviceProviderID: null,
						})
					);
					if (!socket.connected) {
						socket.connect();

						socket.emit('add-username', tempUserName);
					}
				}

				if (accountType === 'ServiceProvider') {
					dispatch(
						setCurrentUser({
							userName: tempUserName,
							accountType: accountType,
							serviceProviderID: authid,
						})
					);
				}

				dispatch(toggleLogIn(true));
			} else {
				console.log('Verification code invalid');
			}
		} catch (e) {
			console.log(e);
		}
	};

	const isDarkMode = useColorScheme() === 'dark';

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			/>

			<Image
				source={require('../../assets/QQueue_Small.png')}
				style={styles.image}
			></Image>

			{/* <TextInput
				// multiline
				keyboardType='default'
				style={styles.input}
				onChangeText={(text) => setAuthid(text)}
				value={authid}
			/> */}
			<InputField
				title='Enter Verification Code'
				placeholder='eg. 926412'
				secureTextEntry={false}
				updateFieldFunc={(text) => setAuthid(text)}
				value={authid}
			/>
			{isLoading ? (
				<View style={styles.button}>
					<ActivityIndicator color={'#7879F1'}></ActivityIndicator>
				</View>
			) : (
				<TouchableOpacity
					style={styles.button}
					onPress={onPressHandler}
				>
					<Text
						style={{
							color: 'white',
							fontSize: 15,
							fontWeight: 'bold',
						}}
					>
						Verify
					</Text>
				</TouchableOpacity>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF8FA',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		height: 250,
		width: 250,
		justifyContent: 'space-around',
		margin: 30,
		marginTop: 10,
		borderWidth: 2,
		borderColor: '#000000',
	},
	input: {
		height: 40,
		width: 350,
		margin: 12,
		borderColor: 'lightgrey',
		borderWidth: 1,
		padding: 8,
	},
	button: {
		backgroundColor: 'pink',
		width: 200,
		height: 50,
		padding: 15,
		margin: 10,
		alignItems: 'center',
		borderRadius: 50,
	},
	textheading: {
		fontSize: 20,
		width: '85%',
		textAlign: 'left',
	},
});

export default TempVerifyScreen;
