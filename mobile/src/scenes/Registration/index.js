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
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation} from 'react-query';

import {register} from '../../services/auth/register';
import {googleRegister} from '../../services/auth/google/googleRegister';
import {AltAuthOptions} from '../../components/molecules/Auth';
import {googleSignIn} from '../../services/auth/google/googleSignIn';
import {setCurrentUser, toggleLogIn} from '../../store/account/actions';


const RegistrationScreen = ({navigation}) => {
	const dispatch = useDispatch();

	const socket = useSelector((state) => state.socket).socket;
	const account = useSelector((state) => state.account);

	const registerMutation = useMutation(register);

	const googleRegisterMutation = useMutation(googleRegister);

	const isLoading = registerMutation.isLoading;

	const [registrationDetails, setRegistrationDetails] = useState({
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
		accountType: 'User',
	});

	const onPressRegister = async () => {
		try {
			const response = await registerMutation.mutateAsync(
				registrationDetails
			);

			if (response.status === 200) {
				const tempUserName = response.data.userName;

				navigation.navigate('Verification', {
					tempUserName: tempUserName,
					accountType: 'User'
				});
			} else {
				setRegistrationDetails({
					userName: '',
					email: '',
					password: '',
					confirmPassword: '',
					accountType: 'User',
				});
			}
		} catch (e) {
			console.log(typeof e);
		}
	};

	const onPressGoogleSignin = async () => {
		try {
			let userInfo = await googleSignIn();
			console.log(userInfo);
			userInfo.user.accountType = 'User';

			const response = await googleRegisterMutation.mutateAsync(userInfo);
			if (response.status === 200) {
				dispatch(
					setCurrentUser({
						userName: response.data.userName,
						accountType: 'User',
						serviceProviderID: null,
					})
				);

				if (!socket.connected) {
					socket.connect()
	
					socket.emit('add-username', account.userName)
				}
				dispatch(toggleLogIn(true));
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
			<ScrollView>
			<Image
				source={{uri: 'https://reactjs.org/logo-og.png'}}
				style={styles.image}
			></Image>
			<Text style={styles.textheading}>Enter Name:</Text>
			<TextInput
				keyboardType='default'
				style={styles.input}
				placeholder='e.g. John Tan'
				onChangeText={(text) =>
					setRegistrationDetails({
						...registrationDetails,
						userName: text,
					})
				}
				value={registrationDetails['userName']}
			/>

			<Text style={styles.textheading}>Enter email:</Text>
			<TextInput
				keyboardType='email-address'
				style={styles.input}
				placeholder='e.g. abc@mail.com'
				onChangeText={(text) =>
					setRegistrationDetails({
						...registrationDetails,
						email: text,
					})
				}
				value={registrationDetails['email']}
			/>

			<Text style={styles.textheading}>Enter password:</Text>
			<TextInput
				secureTextEntry={true}
				style={styles.input}
				placeholder='e.g !jdiU%h*j'
				onChangeText={(text) =>
					setRegistrationDetails({
						...registrationDetails,
						password: text,
					})
				}
				value={registrationDetails['password']}
			/>

			<Text style={styles.textheading}>Confirm password:</Text>
			<TextInput
				secureTextEntry={true}
				style={styles.input}
				placeholder='e.g !jdiU%h*j'
				onChangeText={(text) =>
					setRegistrationDetails({
						...registrationDetails,
						confirmPassword: text,
					})
				}
				value={registrationDetails['confirmPassword']}
			/>

			{isLoading ? (
				<View style={styles.button}>
					<ActivityIndicator color={'#7879F1'}></ActivityIndicator>
				</View>
			) : (
				<TouchableOpacity
					style={styles.button}
					onPress={onPressRegister}
				>
					<Text
						style={{
							color: 'white',
							fontSize: 15,
							fontWeight: 'bold',
						}}
					>
						Register
					</Text>
				</TouchableOpacity>
			)}
			<View style={{flex: 1, flexgrow: 1}}>
				<AltAuthOptions
					altAuthTitle={'Or register with'}
					onPressGoogleLogin={onPressGoogleSignin}
				></AltAuthOptions>
			</View>

			</ScrollView>
			
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		flexgrow: 1,
		alignSelf: 'center',
	},
	image: {
		height: 250,
		width: 250,
		justifyContent: 'space-around',
		margin: 30,
		marginTop: 10,
		alignSelf: 'center',
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
		alignSelf: 'center',
	},
	textheading: {
		fontSize: 20,
		width: '85%',
		textAlign: 'left',
		marginLeft: 12,
	},
});

export default RegistrationScreen;
