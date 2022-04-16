import React, {useEffect, useRef, useState} from 'react';

import {useSelector} from 'react-redux';

import {
	ScrollView,
	Image,
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity
} from 'react-native';

import InputField from '../../../components/atoms/InputField';

const InsertCustomerContent = (props) => {
	const {insertUserToQueue} = props;

	//const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	const account = useSelector((state) => state.account);

	const [userName, setUserName] = useState('');

	const addUserToQueue = () => {
		insertUserToQueue(userName, account.serviceProviderID, 1); // Pax hardcoded to 1 temporarily
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.heading}>Insert Customer</Text>
				<Image
					style={styles.logo}
					source={require('../../../assets/frame.png')}
				/>
				<View>
					<Text style={styles.or}>OR</Text>
					{/* <Text style={styles.paragraph}>Account ID:</Text> */}
				</View>
				{/* <TextInput
					style={styles.input}
					placeholder='Enter here'
					onChangeText={(text) => setUserName(text)}
					value={userName}
				/> */}
				<InputField
					title='Enter Account ID:'
					placeholder='eg. 926412'
					secureTextEntry={false}
					updateFieldFunc={(text) => setUserName(text)}
					value={userName}
				/>

				<View style={{marginBottom: 20}}>
					<TouchableOpacity
						style={styles.button}
						onPress={addUserToQueue}
					>
						<Text style={styles.textButton}>Confirm</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		padding: 20,
	},
	heading: {
		margin: 10,
		fontSize: 25,
		fontWeight: 'bold',
		//justifyContent: 'flex-start',
		position: 'relative',
		color: '#000000',
		marginBottom: 45,
		textAlignVertical: 'top',
		textAlign: 'left',
		alignSelf: 'flex-start',
	},
	paragraph: {
		margin: 10,
		fontSize: 18,
		fontWeight: 'bold',
		//justifyContent: 'flex-start',
		position: 'relative',
		color: '#000000',
		marginBottom: 10,
		//alignItems: 'center',
		//textAlign: 'left',
		alignSelf: 'flex-start',
	},
	or: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#AAAAAA',
		margin: 20,
	},
	input: {
		height: '7%',
		width: '90%',
		margin: 10,
		padding: 10,
		borderWidth: 0.5,
	},
	button: {
		borderRadius: 10,

		paddingVertical: 5,
		paddingHorizontal: 20,
		borderColor: 'transparent',
		//alignItems: 'center',
		marginVertical: 20,
		backgroundColor: 'pink',
		width: '100%',
		//flex: 1,
		// textAlign: 'right',
		alignSelf: 'flex-end',
	},
	textButton: {
		fontWeight: 'bold',
		fontSize: 18,
		color: '#000000',
	},
	logo: {
		height: 250,
		width: 250,
	},
});

export default InsertCustomerContent;
