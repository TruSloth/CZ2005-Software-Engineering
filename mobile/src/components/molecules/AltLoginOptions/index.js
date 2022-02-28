import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

const AltLoginOptions = () => {
	return (
		<View style={{flex: 1, flexGrow: 1, justifyContent: 'space-evenly'}}>
			<Text style={[styles.subText, {alignSelf: 'center'}]}>
				Or login with
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
				<Image
					source={{
						uri: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png',
					}}
					style={styles.tinyLogo}
				/>
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
		width: 50,
		height: 50,
	},
});

export default AltLoginOptions;
