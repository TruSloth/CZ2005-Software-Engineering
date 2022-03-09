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
} from 'react-native';

import {register} from '../../services/auth/register';
import {useMutation} from 'react-query';

const RegistrationScreen = ({navigation}) => {
	const registerMutation = useMutation(register);

	const [registrationDetails, setRegistrationDetails] = useState({
		userName: '',
		email: '',
		password: '',
	});

	const onPressHandler = async () => {
		try {
			const response = await registerMutation.mutateAsync(
				registrationDetails
			);

			if (response.status == 200) {
				const tempUserName = response.data.userName;

				navigation.navigate('Verification', {
					tempUserName: tempUserName,
				});
			} else {
				setRegistrationDetails({
					userName: '',
					email: '',
					password: '',
				});
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
				source={{uri: 'https://reactjs.org/logo-og.png'}}
				style={styles.image}
			></Image>
			<Text style={styles.textheading}>Enter Name:</Text>
			<TextInput
				// multiline
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

			<TouchableOpacity style={styles.button} onPress={onPressHandler}>
				<Text
					style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}
				>
					Register
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		height: 250,
		width: 250,
		justifyContent: 'space-around',
		margin: 30,
		marginTop: 10,
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

export default RegistrationScreen;
