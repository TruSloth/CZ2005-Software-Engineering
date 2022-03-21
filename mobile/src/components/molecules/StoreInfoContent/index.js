import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

const StoreInfoContent = (props) => {
	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	const {moreInfoOnPress, queueOnPress} = props;

	
		const onRead = (e) => {
			console.log('found a qr code!')
			console.log(e)
		}

	return (
		<View style={styles.container}>
  
		<View style={styles.container1}>
			 <Text style = {styles.textBold}>Time to check out?  </Text>
			 <Text style = {styles.textBody}> Please scan your QR code to check out of Location1. </Text>
			
		</View >
		<View style={styles.container1}>
		<QRCodeScanner 
		onRead={onRead}
				containerStyle={{height: 300}}
		cameraProps={{ratio: "1:1"}}
		cameraStyle={{ height: '50%',  width: '50%', borderRadius: 10, alignSelf: 'center', justifyContent: 'center' }}
			></QRCodeScanner>
			</View >
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		height: 450,
	},
	container1: {
		flex: 1,
	},
	textBold: {
        
        fontSize: 24,
        fontWeight: '500',
        color: '#7879F1',
        padding: 32,
        textAlign: 'center',
    },

    textBody: {
        fontSize: 14,
        color: '#7879F1',
        textAlign: 'center',
    },

});


export default StoreInfoContent;
