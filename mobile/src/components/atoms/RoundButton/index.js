import React from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const RoundButton = (props) => {
	const {style, title, onPress} = props;

	return (
		<TouchableOpacity style={[styles.loginButton, style]} onPress={onPress}>
			<Text style={[{alignContent: 'center', color: '#7879F1'}]}>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	loginButton: {
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderColor: '#7879F1',
		alignItems: 'center',
		marginVertical: 10,
	},
});

export default RoundButton;
