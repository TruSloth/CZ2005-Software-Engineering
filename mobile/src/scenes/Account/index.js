
import React from "react";

import { Button } from "react-native-elements";
import {SafeAreaView, StatusBar} from 'react-native';

import AccountScreenContent from "../../components/organisms/AccountScreenContent";

const AccountScreen = ({navigation}) => {
    return (
		<SafeAreaView style={{flex: 1}}>
			<StatusBar />
			<AccountScreenContent></AccountScreenContent>
		</SafeAreaView>
	);
}

export default AccountScreen;