import React from 'react';

import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

// Renders a row of alternative authentication options as logos

const AltAuthOptions = (props) => {
	const {onPressGoogleLogin, altAuthTitle} = props;

	return (
		<View style={{flex: 1, flexGrow: 1, justifyContent: 'space-evenly'}}>
			<Text style={[styles.subText, {alignSelf: 'center'}]}>
				{altAuthTitle}
			</Text>
			<View
				style={{flexDirection: 'row', justifyContent: 'space-evenly'}}
			>
				<Image
					source={{
						uri: 'https://app.singpass.gov.sg/static/og_image.png',
					}}
					style={styles.tinyLogo}
				/>
				<GoogleSigninButton
					style={styles.tinyLogo}
					size={GoogleSigninButton.Size.Icon}
					color={GoogleSigninButton.Color.Light}
					onPress={onPressGoogleLogin}
				></GoogleSigninButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	subText: {
		fontSize: 15,
		color: '#7879F1',
	},
	tinyLogo: {
		width: 48,
		height: 48,
	},
});

export default AltAuthOptions;
