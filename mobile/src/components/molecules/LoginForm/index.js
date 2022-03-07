import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import RoundButton from '../../atoms/RoundButton';
import InputField from '../../atoms/InputField';

const LoginForm = ({submitForm}) => {
	const [email, onChangeEmail] = React.useState(null);
	const [password, onChangePassword] = React.useState(null);

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
				updateFieldFunc={onChangePassword}
			></InputField>
			<Text style={[styles.clickableText, {alignSelf: 'flex-end'}]}>
				Forgot Password?
			</Text>
			<RoundButton title='Login' onPress={() => {submitForm(email, password)}}></RoundButton>
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
