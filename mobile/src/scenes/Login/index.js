import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch} from 'react-redux';
import {toggleLogIn} from '../../store/auth/actions';
import { setCurrentUser } from '../../store/account/actions';

import LoginContent from '../../components/organisms/LoginContent';
import {login} from '../../services/auth/login';
import { googleLogin } from '../../services/auth/google/googleLogin';
import { googleSignIn } from '../../services/auth/google/googleSignIn';
import {useMutation} from 'react-query';

const LoginScreen = ({navigation}) => {
	const isDarkMode = useColorScheme() === 'dark';

	const registerOnPress = () => {
		navigation.navigate('Registration')
	}

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	const dispatch = useDispatch();

	const loginMutation = useMutation(login);

	const googleLoginMutation = useMutation(googleLogin);

	const isLoading = loginMutation.isLoading;

	const login = async (email, password) => {
		try {
			const response = await loginMutation.mutateAsync({email: email, password: password});

			if (response.status === 200) {
				dispatch(setCurrentUser(response.data.userName))
				dispatch(toggleLogIn(true));
			}
		} catch (e) {
			console.log(e)
		}
	
	};

	const onPressGoogleSignin = async () => {
		try {
			const userInfo = await googleSignIn();

			const response = await googleLoginMutation.mutateAsync(userInfo)
			
			if (response.status === 200) {
				dispatch(setCurrentUser(response.data.userName))
				dispatch(toggleLogIn(true))
			}
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<SafeAreaView style={[backgroundStyle, {flex: 1, padding: 10}]}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			/>
			<LoginContent submitForm={login} registerOnPress={registerOnPress} loading={isLoading} onPressGoogleSignin={onPressGoogleSignin}></LoginContent>
		</SafeAreaView>
	);
};

export default LoginScreen;
