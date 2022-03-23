import React from 'react';

import {TouchableOpacity, Text, StyleSheet, View, ActivityIndicator} from 'react-native';

// Renders a Round Corner Button with a loading indicator

const RoundButton = (props) => {
	const {style, title, onPress, loading} = props;

	return loading ? (
		<View style={[styles.loginButton, style]}>
			<ActivityIndicator color={'#7879F1'}></ActivityIndicator>
		</View>
	) : (
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
