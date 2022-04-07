import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {useState} from 'react';

import RoundButton from '../../atoms/RoundButton';
import InputField from '../../atoms/InputField';

// Renders a login form consisting of email and password entries, as well as a submission button

const LoginForm = (props) => {
	const {submitForm, loading, navigation} = props;

	const [email, onChangeEmail] = useState(null);
	const [password, onChangePassword] = useState(null);

	return (
		<View style={{flex: 1, flexGrow: 0}}>
			<InputField
				title='Email'
				placeholder='Your email id'
				updateFieldFunc={onChangeEmail}
			></InputField>
			<InputField
				title='Password'
				placeholder='Your password'
				secureTextEntry={true}
				updateFieldFunc={onChangePassword}
			></InputField>
			<Text style={[styles.clickableText, {alignSelf: 'flex-end'}]}>
				Forgot Password?
			</Text>
			<RoundButton
				title='Login'
				onPress={() => {
					submitForm(email, password);

					// {account.isLoggedIn ? (
					// 	<Navigator></AppNavigator>
					// ) : (
					// 	<AuthNavigator></AuthNavigator>
					// )}
					// navigation.navigate('BusinessNavigator', {
					// 	screen: 'BusinessHome',
					// });
					//navigation.navigate('HomeScreen');
				}}
				loading={loading}
			></RoundButton>
		</View>
	);
};

const styles = StyleSheet.create({
	clickableText: {
		color: '#F178B6',
		textDecorationLine: 'underline',
	},
});

export default LoginForm;
