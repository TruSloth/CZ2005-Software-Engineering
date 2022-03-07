import React from 'react';
import {
	SafeAreaView,
	StatusBar,
	useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import { useDispatch, useSelector } from 'react-redux';
import { login} from '../../store/auth/actions';

import LoginContent from '../../components/organisms/LoginContent';

const LoginScreen = ({navigation}) => {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const submitForm = (email, password) => {
		dispatch(login({email: email, password: password}))

	};

	return (
		<SafeAreaView style={[backgroundStyle, {flex: 1, padding: 10}]}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			/>
			<LoginContent submitForm={submitForm}></LoginContent>
		</SafeAreaView>
	);
};

export default LoginScreen;
