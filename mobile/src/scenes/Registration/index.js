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
	Alert,
} from 'react-native';
import InputField from '../../components/atoms/InputField';
import {useDispatch, useSelector} from 'react-redux';
import {useMutation} from 'react-query';

import {register} from '../../services/auth/register';
import {googleRegister} from '../../services/auth/google/googleRegister';
import {AltAuthOptions} from '../../components/molecules/Auth';
import {googleSignIn} from '../../services/auth/google/googleSignIn';
import {setCurrentUser, toggleLogIn} from '../../store/account/actions';
import ThemedDialog from 'react-native-elements/dist/dialog/Dialog';

const RegistrationScreen = ({navigation, props}) => {
	const dispatch = useDispatch();

	//const {backOnPress} = props;
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

	const onPressBack = () => {
		navigation.goBack();
	};
	const onPressLogin = () => {
		navigation.navigate('Login');
	};

	const setRegDetails = () => {
		setRegistrationDetails({
			userName: '',
			email: '',
			password: '',
			confirmPassword: '',
			accountType: 'User',
		});
	};
	const onPressRegister = async () => {
		try {
			let response = 1; //need to define response first for 3rd if block bc cant define const in if block
			let indicator = 1;

			//if (registrationDetails.userName.)
			if (registrationDetails.password.length < 8) {
				Alert.alert('Password must be at least 8 chacters');
				indicator = 0;
			}
			if (
				registrationDetails.password !=
				registrationDetails.confirmPassword
			) {
				Alert.alert('Password mismatch');
				indicator = 0;

				//console.log('pw mismatch & indicator ' + indicator);
				// setRegistrationDetails({
				// 	userName: '',
				// 	email: '',
				// 	password: '',
				// 	confirmPassword: '',
				// 	accountType: 'User',
				// });
				// console.log('yes');
			}

			if (indicator == 1) {
				response = await registerMutation.mutateAsync(
					registrationDetails
				);
			}

			if (response.status === 200 && indicator == 1) {
				//console.log('responsestatus & indicator ' + indicator);
				// if (registrationDetails.password.length < 8) {
				// 	Alert.alert('Password must be more than 8 chacters');
				// 	console.log('pw less than 8 chars');

				// 	setRegistrationDetails({
				// 		userName: '',
				// 		email: '',
				// 		password: '',
				// 		confirmPassword: '',
				// 		accountType: 'User',
				// 	});
				// } else if (
				// 	registrationDetails.password !=
				// 	registrationDetails.confirmPassword
				// ) {
				// 	Alert.alert('Password mismatch');
				// 	console.log('pw mismatch');
				// 	setRegistrationDetails({
				// 		userName: '',
				// 		email: '',
				// 		password: '',
				// 		confirmPassword: '',
				// 		accountType: 'User',
				// 	});
				// } else {
				// 	console.log('success');
				const tempUserName = response.data.userName;

				navigation.navigate('Verification', {
					tempUserName: tempUserName,
					accountType: 'User',
				});
				//}
			} else {
				setRegistrationDetails({
					userName: '',
					email: '',
					password: '',
					confirmPassword: '',
					accountType: 'User',
				});
				//console.log(registrationDetails.userName);
			}
		} catch (e) {
			console.log(e);
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
					socket.connect();

					socket.emit('add-username', response.data.userName);
				}
				dispatch(toggleLogIn(true));
			}
		} catch (e) {
			console.log(e);
		}
	};

	const [password, onChangePassword] = useState(null);
	const isDarkMode = useColorScheme() === 'dark';

	// const validateField = () => {};
	// const validRegister = () => {
	// 	//if()
	// 	setRegistrationDetails({
	// 		...registrationDetails,
	// 		password: text,
	// 		value: registrationDetails['password'],
	// 	});
	// };

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			/>
			<ScrollView>
				<View style={styles.sqaure}>
					<Image
						source={require('../../assets/QQueue_Small.png')}
						style={[
							styles.image,
							{
								alignSelf: 'center',
								backgroundColor: '#FCDDEC',
								borderWidth: 2,
								borderColor: '#000000',
								marginTop: 30,
								marginBottom: 30,
								flex: 1,
							},
						]}
					/>
				</View>
				<View style={[{marginLeft: 70}, {marginRight: 70}]}>
					<InputField
						title='Name'
						placeholder='Your name'
						secureTextEntry={false}
						updateFieldFunc={(text) =>
							//if(text.state.)
							setRegistrationDetails({
								...registrationDetails,
								userName: text,
							})
						}
						value={registrationDetails['userName']}
					/>

					<InputField
						title='Email'
						placeholder='Your email'
						secureTextEntry={false}
						updateFieldFunc={(text) =>
							setRegistrationDetails({
								...registrationDetails,
								email: text,
							})
						}
						value={registrationDetails['email']}
					/>
					<InputField
						title='Password'
						placeholder='Your password'
						secureTextEntry={true}
						updateFieldFunc={(text) =>
							setRegistrationDetails({
								...registrationDetails,
								password: text,
								//	value: registrationDetails['password'],
							})
						}
						value={registrationDetails['password']}
					/>

					{/* <Text style={styles.textheading}>Confirm password:</Text>
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
				/> */}
					<InputField
						// secureTextEntry={true}
						// style={styles.input}
						// placeholder='e.g !jdiU%h*j'
						// onChangeText={(text) =>
						// 	setRegistrationDetails({
						// 		...registrationDetails,
						// 		password: text,
						// 	})
						// }
						// value={registrationDetails['password']}
						title=' Confirm Password'
						placeholder='Your password'
						secureTextEntry={true}
						updateFieldFunc={(text) =>
							setRegistrationDetails({
								...registrationDetails,
								confirmPassword: text,
							})
						}
						value={registrationDetails['confirmPassword']}
					/>
				</View>
				{isLoading ? (
					<View style={styles.button}>
						<ActivityIndicator
							color={'#7879F1'}
						></ActivityIndicator>
					</View>
				) : (
					<TouchableOpacity
						style={styles.button}
						onPress={onPressRegister}
					>
						<Text
							style={{
								color: '#000000',
								fontSize: 15,
								fontWeight: 'bold',
							}}
						>
							Register
						</Text>
					</TouchableOpacity>
				)}
				<View style={{flex: 1, flexgrow: 1, marginBottom: 20}}>
					<AltAuthOptions
						altAuthTitle={'Or register with'}
						onPressGoogleLogin={onPressGoogleSignin}
					></AltAuthOptions>
				</View>

				<View style={styles.bottomLinks}>
					<Text style={styles.subText}>Not a User? </Text>
					<TouchableOpacity onPress={onPressBack}>
						<Text style={styles.clickableText}>Back</Text>
					</TouchableOpacity>
				</View>

				<View style={[styles.bottomLinks, {paddingBottom: 20}]}>
					<Text style={styles.subText}>
						Already have an account?{' '}
					</Text>
					<TouchableOpacity onPress={onPressLogin}>
						<Text style={styles.clickableText}>Login</Text>
					</TouchableOpacity>
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
		height: 150,
		width: 150,
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
		height: 40,
		padding: 10,
		margin: 20,
		alignItems: 'center',
		borderRadius: 30,
		alignSelf: 'center',
	},
	textheading: {
		fontSize: 20,
		width: '85%',
		textAlign: 'left',
		marginLeft: 12,
	},
	sqaure: {
		height: 190,
		flex: 1,
		width: 400,
		backgroundColor: '#FCDDEC',
		marginBottom: 20,
	},
	subText: {
		fontSize: 15,
		color: '#000000',
	},
	clickableText: {
		color: '#E89575',
		textDecorationLine: 'underline',
	},
	bottomLinks: {
		flexDirection: 'row',
		paddingLeft: '18%',
	},
});

export default RegistrationScreen;
