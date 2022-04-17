import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import {useState} from 'react';

import RoundButton from '../../atoms/RoundButton';
import InputField from '../../atoms/InputField';

/**
 * Renders a login form consisting of email and password entries, as well as a submission button.
 *
 * @category Components
 * @exports LoginForm
 * @subcategory Molecules
 *
 * @example <caption>Default example</caption>
 * return(
 *   <LoginForm
 * 		submitForm={() => {console.log('Form submitted')}}							
 *		loading={false}
 *   </LoginForm>
 * )
 *
 * @property {Function} submitForm Callback used when the form is to be submitted
 * @property {Boolean} loading Whether the form is in the process of being submitted
 */

const LoginForm = (props) => {
	const {submitForm, loading} = props;
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
				}}
				loading={loading}
			></RoundButton>
		</View>
	);
};

const styles = StyleSheet.create({
	clickableText: {
		color: '#E89575',
		textDecorationLine: 'underline',
	},
});

export default LoginForm;
