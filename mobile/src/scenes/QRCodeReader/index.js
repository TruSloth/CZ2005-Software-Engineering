import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IN_STORE} from '../../store/account/constants';
import {QRCodeReader} from '../../components/molecules/BottomSheet';

const QRCodeReaderScreen = () => {
	const account = useSelector((state) => state.account);

	return (
		<View style={styles.container}>
			{account.queueStatus === IN_STORE ? (
				<View style={styles.container1}>
					<Text style={styles.textBold}>Time to check out? </Text>
					<Text style={styles.textBody}>
						{`Please scan your QR code to check out of ${account.currentQueueName}.`}
					</Text>
				</View>
			) : (
				<View style={styles.container1}>
					<Text style={styles.textBold}>Looks like you aren't ready to check out</Text>
				</View>
			)}
			<QRCodeReader></QRCodeReader>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
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

export default QRCodeReaderScreen;
