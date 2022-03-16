import React from "react";
import { View } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';

const NotificationsScreen = () => {
    const onRead = (e) => {
        console.log('found a qr code!')
        console.log(e)
    }

    return (
        <View>
            <QRCodeScanner onRead={onRead}></QRCodeScanner>
        </View>
    )
}

export default NotificationsScreen;