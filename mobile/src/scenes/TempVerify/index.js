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

import { useDispatch, useSelector } from 'react-redux';

import { verify } from '../../store/auth/actions';


const TempVerifyScreen = () => {
	const dispatch = useDispatch();

	const auth = useSelector(state => state.auth)

	const [authid, setAuthid] = useState('');

	const onPressHandler = () => {
		dispatch(verify(authid))
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

			<TouchableOpacity style={styles.button} onPress={onPressHandler}>
				<Text
					style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}
				>
					Verify
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

export default TempVerifyScreen;
