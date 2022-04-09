import React from 'react';

import {
	ScrollView,
	Image,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
//import LoginForm from '../../molecules/Auth/LoginForm';
//import AltAuthOptions from '../../molecules/Auth/AltAuthOptions';

import {LoginForm, AltAuthOptions, BizAuthOptions} from '../../molecules/Auth';

const ServiceProviderLoginScreenContent = (props) => {
	const {
		submitForm,
		registerOnPress,
		loading,
		onPressGoogleSignin,
		navigation,
	} = props;

	// const BizLoginOnPress = () => {
	// 	navigation.navigate('BusinessLogin');
	// };

	const LoginOnPress = () => {
		navigation.navigate('Login');
	};

	const reactNativeLogo = '../../../assets/react-native-logo.png';

	return (
		<ScrollView
			style={styles.centeredContainer}
			contentContainerStyle={{flexGrow: 1}}
		>
			<Image
				source={require(reactNativeLogo)}
				style={[
					styles.largeLogo,
					{
						alignSelf: 'center',
						backgroundColor: '#FCDDEC',
						borderWidth: 2,
						borderColor: '#7879F1',
					},
				]}
			/>
			<View style={{flex: 1, justifyContent: 'center'}}>
				<Text
					style={[
						styles.titleText,
						{color: '#F178B6'},
						{textDecorationLine: 'underline'},
						{padding: 5, alignSelf: 'center'},
					]}
				>
					BUSINESS
				</Text>
				<Text
					style={[
						styles.titleText,
						{padding: 5, alignSelf: 'center'},
					]}
				>
					Welcome Back!
				</Text>
				<Text
					style={[
						styles.subtitleText,
						{padding: 5, alignSelf: 'center'},
					]}
				>
					Login to your business account
				</Text>
			</View>
			<LoginForm submitForm={submitForm} loading={loading}></LoginForm>
			{/* <BizAuthOptions
				altAuthTitle={'Or login with'}
				onPressGoogleLogin={onPressGoogleSignin}
			></BizAuthOptions> */}
			<AltAuthOptions
				altAuthTitle={'Or login with'}
				onPressGoogleLogin={onPressGoogleSignin}
			></AltAuthOptions>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.subText}>User account? </Text>
				<TouchableOpacity onPress={LoginOnPress}>
					<Text style={styles.clickableText}>Login</Text>
				</TouchableOpacity>
			</View>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.subText}>New store? </Text>
				<TouchableOpacity onPress={registerOnPress}>
					<Text style={styles.clickableText}>Register your UEN</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	centeredContainer: {
		alignSelf: 'center',
		flex: 1,
	},
	titleText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#7879F1',
	},
	subtitleText: {
		fontSize: 15,
		color: '#A5A6F6',
	},
	subText: {
		fontSize: 15,
		color: '#7879F1',
	},
	largeLogo: {
		width: 100,
		height: 100,
	},
	clickableText: {
		color: '#F178B6',
		textDecorationLine: 'underline',
	},
});

export default ServiceProviderLoginScreenContent;