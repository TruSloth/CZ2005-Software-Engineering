import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch} from 'react-redux';
import {setCurrentUser, toggleLogIn} from '../../store/account/actions';

import BusinessHomeScreenContent from '../../components/organisms/BusinessHomeScreenContent';
import LoginScreenContent from '../../components/organisms/LoginScreenContent';
import {login} from '../../services/auth/login';
import {googleLogin} from '../../services/auth/google/googleLogin';
import {googleSignIn} from '../../services/auth/google/googleSignIn';
import {useMutation} from 'react-query';

const LoginScreen = ({navigation}) => {
	const isDarkMode = useColorScheme() === 'dark';

	const registerOnPress = () => {
		navigation.navigate('Registration');
	};

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	const dispatch = useDispatch();

	const loginMutation = useMutation(login);

	const googleLoginMutation = useMutation(googleLogin);

	const isLoading = loginMutation.isLoading;

	const onPressLogin = async (email, password) => {
		try {
			const response = await loginMutation.mutateAsync({
				email: email,
				password: password,
				accountType: 'User',
			});

			if (response.status === 200) {
				dispatch(
					setCurrentUser({
						userName: response.data.userName,
						accountType: 'User',
					})
				);
				dispatch(toggleLogIn(true));
			}
		} catch (e) {
			console.log('user error block');
			console.log(e);
		}
	};

	const onPressGoogleSignin = async () => {
		try {
			let userInfo = await googleSignIn();
			userInfo.user.accountType = 'User';

			if (response.status === 200) {
				dispatch(
					setCurrentUser({
						userName: response.data.userName,
						accountType: 'User',
					})
				);
				dispatch(toggleLogIn(true));
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<SafeAreaView style={[backgroundStyle, {flex: 1, padding: 10}]}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
			/>
			<LoginScreenContent
				submitForm={onPressLogin}
				registerOnPress={registerOnPress}
				loading={isLoading}
				onPressGoogleSignin={onPressGoogleSignin}
				navigation={navigation}
			></LoginScreenContent>
		</SafeAreaView>
	);
};

export default LoginScreen;
