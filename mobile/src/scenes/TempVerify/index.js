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

import {useDispatch} from 'react-redux';

import {useMutation} from 'react-query';

import {verify} from '../../services/auth/verify';
import { setCurrentUser, toggleLogIn } from '../../store/account/actions';

const TempVerifyScreen = ({route}) => {
	const {tempUserName} = route.params;

	const dispatch = useDispatch();

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
				dispatch(setCurrentUser({username: tempUserName, accountType: 'User'}));
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
				source={{uri: 'https://reactjs.org/logo-og.png'}}
				style={styles.image}
			></Image>
			<Text style={styles.textheading}>Enter Verification Code:</Text>
			<TextInput
				// multiline
				keyboardType='default'
				style={styles.input}
				onChangeText={(text) => setAuthid(text)}
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

export default TempVerifyScreen;
