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
	ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useMutation} from 'react-query';
import InputField from '../../components/atoms/InputField';

import {register} from '../../services/auth/register';
import {googleRegister} from '../../services/auth/google/googleRegister';
import {AltAuthOptions} from '../../components/molecules/Auth';
import {googleSignIn} from '../../services/auth/google/googleSignIn';
import {setCurrentUser, toggleLogIn} from '../../store/account/actions';

const ServiceProviderRegistrationScreen = ({navigation}) => {
	const dispatch = useDispatch();

	const registerMutation = useMutation(register);

	const googleRegisterMutation = useMutation(googleRegister);

	const isLoading = registerMutation.isLoading;

	const [registrationDetails, setRegistrationDetails] = useState({
		userName: '',
		email: '',
		password: '',
		confirmPassword: '',
		accountType: 'ServiceProvider',
	});

	const onPressBack = () => {
		navigation.goBack();
	};
	const onPressLogin = () => {
		navigation.navigate('ServiceProviderLogin');
	};

	const onPressRegister = async () => {
		try {
			const response = await registerMutation.mutateAsync(
				registrationDetails
			);

			if (response.status === 200) {
				const tempUserName = response.data.userName;

				navigation.navigate('Verification', {
					tempUserName: tempUserName,
					accountType: 'ServiceProvider',
				});
			} else {
				setRegistrationDetails({
					userName: '',
					email: '',
					password: '',
					confirmPassword: '',
					accountType: 'ServiceProvider',
				});
			}
		} catch (e) {
			console.log('onpressregister');
			console.log(typeof e);
		}
	};

	const onPressGoogleSignin = async () => {
		try {
			let userInfo = await googleSignIn();

			userInfo.user.accountType = 'ServiceProvider';

			const response = await googleRegisterMutation.mutateAsync(userInfo);
			if (response.status === 200) {
				navigation.navigate('Verification', {
					tempUserName: response.data.userName,
					accountType: 'ServiceProvider',
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	const [passwordError, setPasswordError] = useState('');
	const checkPassword = (text) => {
		// const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
		// if (strongRegex.test(text)) {
		// 	setRegistrationDetails({
		// 		...registrationDetails,
		// 		password: text,
		// 	})
		// 	value=registrationDetails['password']
		// 	return true
		// }
		// if (text.length == 0) {
		// 	console.log('pw is req');
		// 	//setPasswordError('Password is required');
		// } else
		if (text.length < 8) {
			// 	//setPasswordError('Password should be minimum 6 characters');
			console.log('pw less than 8 chars');
			// } else if (text.length.indexOf(' ') >= 0) {
			// 	//setPasswordError('Password cannot contain spaces');
			// } else {
			// 	setPasswordError('');}
		} else {
			setRegistrationDetails({
				...registrationDetails,
				password: text,
			});
			value = registrationDetails['password'];
			// }
			console.log('done');
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
					source={require('../../assets/QQueue_Small.png')}
					style={[
						styles.image,
						{
							alignSelf: 'center',
							backgroundColor: '#FCDDEC',
							borderWidth: 2,
							borderColor: '#000000',
						},
					]}
				/>

				<View style={{flex: 1, justifyContent: 'center'}}>
					<Text
						style={[
							styles.titleText,
							{color: '#F178B6'},
							{textDecorationLine: 'underline'},
							{padding: 5, alignSelf: 'center'},
						]}
					>
						BUSINESS
					</Text>
					<Text
						style={[
							styles.titleText,
							{padding: 5, alignSelf: 'center'},
						]}
					>
						Welcome!
					</Text>
					<Text
						style={[
							styles.subtitleText,
							{padding: 5, alignSelf: 'center'},
						]}
					>
						Register your business account
					</Text>
				</View>

				<View style={[{marginLeft: 70}, {marginRight: 70}]}>
					<InputField
						title='Business Name'
						placeholder='Your Business name'
						secureTextEntry={false}
						updateFieldFunc={(text) =>
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
						updateFieldFunc={
							(text) =>
								setRegistrationDetails({
									...registrationDetails,
									password: text,
								})
							//(text) => checkPassword(text)
						}
						value={registrationDetails['password']}
					/>

					<InputField
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
								color: 'white',
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

				<View style={[styles.bottomLinks, {marginBottom: 20}]}>
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
		//flexgrow: 1,
		//alignSelf: 'center',
	},
	image: {
		height: 150,
		width: 150,
		// justifyContent: 'space-around',
		margin: 30,
		// marginTop: 10,
		// alignSelf: 'center',
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
	titleText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#000000',
	},
	subtitleText: {
		fontSize: 15,
		color: '#AAAAAA',
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

export default ServiceProviderRegistrationScreen;
