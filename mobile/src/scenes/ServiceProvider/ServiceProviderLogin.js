import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch} from 'react-redux';
import {setCurrentUser, toggleLogIn} from '../../store/account/actions';

import {ServiceProviderLoginScreenContent} from '../../components/organisms/ServiceProvider'
import {login} from '../../services/auth/login';
import {googleLogin} from '../../services/auth/google/googleLogin';
import {googleSignIn} from '../../services/auth/google/googleSignIn';
import {useMutation} from 'react-query';
import {useSelector} from 'react-redux';

const ServiceProviderLoginScreen = ({navigation}) => {
	const isDarkMode = useColorScheme() === 'dark';

	const registerOnPress = () => {
		navigation.navigate('Registration');
	};

	const backOnPress = () => {
		navigation.navigate('Onboarding');
	};

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	const dispatch = useDispatch();

	const loginMutation = useMutation(login);

	const googleLoginMutation = useMutation(googleLogin);

	const isLoading = loginMutation.isLoading;
	const account = useSelector((state) => state.account);

	const onPressLogin = async (email, password) => {
		try {
			account.accountType = 'ServiceProvider';

			const response = await loginMutation.mutateAsync({
				email: email,
				password: password,
				accountType: 'ServiceProvider',
			});

			if (response.status === 200) {
				dispatch(
					setCurrentUser({
						userName: response.data.userName,
						accountType: 'ServiceProvider',
						serviceProviderID: response.data.serviceProviderID,
						avatarImageURL: null
					})
				);
				dispatch(toggleLogIn(true));
			}
		} catch (e) {
			console.log(e);
		}
	};

	const onPressGoogleSignin = async () => {
		try {
			const userInfo = await googleSignIn();

			userInfo.user.accountType = 'ServiceProvider'

			const response = await googleLoginMutation.mutateAsync(userInfo);

			if (response.status === 200) {
				dispatch(
					setCurrentUser({
						userName: response.data.userName,
						accountType: 'ServiceProvider',
						serviceProviderID: response.data.serviceProviderID,
						avatarImageURL: userInfo.user.photo
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
			<ServiceProviderLoginScreenContent
				submitForm={onPressLogin}
				registerOnPress={registerOnPress}
				backOnPress={backOnPress}
				loading={isLoading}
				onPressGoogleSignin={onPressGoogleSignin}
				navigation={navigation}
			></ServiceProviderLoginScreenContent>
		</SafeAreaView>
	);
};

export default ServiceProviderLoginScreen;