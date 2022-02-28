import React from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	useColorScheme,
	View,
	Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import LoginContent from '../../components/organisms/LoginContent';

const LoginScreen = ({navigation}) => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	const submitForm = () => {
		// return fetch('http://10.27.225.240:5000/api/members/', {
		// 	method: 'POST',
		// 	headers: {'Content-Type': 'application/json'},
		// 	body: JSON.stringify({
		// 		email: email,
		// 		password: password,
		// 	}),
		// })
		// 	.then((response) => response.json())
		// 	.then((json) => {
		// 		console.log(json);
		// 	})
		// 	.catch((e) => {
		// 		console.log(e);
		// 	});
		navigation.navigate('Home');
	};

	return (
		<SafeAreaView style={[backgroundStyle, {flex: 1, padding: 10}]}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			/>
			<LoginContent submitForm={submitForm}></LoginContent>
		</SafeAreaView>
	);
};

// const styles = StyleSheet.create({
// 	centeredContainer: {
// 		alignSelf: 'center',
// 		flex: 1,
// 	},
// 	inputField: {
// 		borderBottomWidth: 1,
// 		borderColor: '#A5A6F6',
// 		borderRadius: 5,
// 	},
// 	titleText: {
// 		fontSize: 30,
// 		fontWeight: 'bold',
// 		color: '#7879F1',
// 	},
// 	subtitleText: {
// 		fontSize: 15,
// 		color: '#A5A6F6',
// 	},
// 	loginButton: {
// 		borderRadius: 10,
// 		borderWidth: 1,
// 		paddingVertical: 5,
// 		borderColor: '#7879F1',
// 		alignItems: 'center',
// 		marginVertical: 10,
// 	},
// 	subText: {
// 		fontSize: 15,
// 		color: '#7879F1',
// 	},
// 	tinyLogo: {
// 		width: 50,
// 		height: 50,
// 	},
// 	largeLogo: {
// 		width: 100,
// 		height: 100,
// 	},
// 	clickableText: {
// 		color: '#F178B6',
// 		textDecorationLine: 'underline',
// 	},
// });

export default LoginScreen;
