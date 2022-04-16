import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

/**
 * Renders a QRCodeScanner to be used within {@link module:AppBottomSheet|AppBottomSheet}.
 *
 * @category Components
 * @exports QRCodeReader
 * @subcategory Molecules
 *
 */

const QRCodeReader = (props) => {
	const {onRead} = props

	return (
		<View style={styles.container1}>
				<QRCodeScanner
					onRead={onRead}
					containerStyle={{height: 300}}
					cameraProps={{ratio: '1:1'}}
					cameraStyle={{
						height: '50%',
						width: '50%',
						borderRadius: 10,
						alignSelf: 'center',
						justifyContent: 'center',
					}}
				></QRCodeScanner>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1
	},
	container1: {
		flex: 1,
	},
	textBold: {
		fontSize: 24,
		fontWeight: '500',
		color: '#000000',
		padding: 32,
		textAlign: 'center',
	},

	textBody: {
		fontSize: 14,
		color: '#000000',
		textAlign: 'center',
	},
});

export default QRCodeReader;
