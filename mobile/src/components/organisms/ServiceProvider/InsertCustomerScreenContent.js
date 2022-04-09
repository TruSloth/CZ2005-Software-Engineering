import React, {useEffect, useRef, useState} from 'react';

import {
	ScrollView,
	Image,
	View,
	Text,
	StyleSheet,
	TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const InsertCustomerContent = (props) => {
	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Insert Customer</Text>
			<Image style={styles.logo} source={{uri: reactNativeLogo}} />
			<View>
				<Text style={styles.or}>OR</Text>
				<Text style={styles.paragraph}>Account ID:</Text>
			</View>
			<TextInput style={styles.input} placeholder='Enter here' />
			<View>
				<TouchableOpacity style={styles.button}>
					<Text style={styles.textButton}>Confirm</Text>
				</TouchableOpacity>
			</View>
		</View>
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
		color: '#7879F1',
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
		color: '#7879F1',
		marginBottom: 10,
		//alignItems: 'center',
		//textAlign: 'left',
		alignSelf: 'flex-start',
	},
	or: {
		fontSize: 18,
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#7879F1',
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
		borderWidth: 1,
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
		fontSize: 15,
		color: '#7879F1',
	},
	logo: {
		height: 250,
		width: 250,
	},
});

export default InsertCustomerContent;