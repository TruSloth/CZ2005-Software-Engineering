import React from 'react';

import {View, Text, TextInput, StyleSheet} from 'react-native';

// Custom rendering of text input field with label

const InputField = (props) => {
	const {title, placeholder, updateFieldFunc, secureTextEntry} = props

	return (
		<View style={{marginVertical: 10}}>
			<Text style={{fontSize: 20, fontWeight: 'bold', color: '#7879F1'}}>
				{title}
			</Text>
			<TextInput
				placeholder={placeholder}
				placeholderTextColor='#A5A6F6'
				style={styles.inputField}
				secureTextEntry={secureTextEntry}
				onChangeText={(text) => updateFieldFunc(text)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputField: {
		borderBottomWidth: 1,
		borderColor: '#A5A6F6',
		borderRadius: 5,
	},
});

export default InputField;
