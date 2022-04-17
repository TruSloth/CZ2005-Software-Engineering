import React from 'react';

import {
	ScrollView,
	Image,
	View,
	Text,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

import {LoginForm, AltAuthOptions} from '../../molecules/Auth';

/**
 * Renders the content for the ServiceProviderLogin Screen.
 *
 * @category Components
 * @exports ServiceProviderLoginScreenContent
 * @subcategory Organisms
 *
 * @property {Function} submitForm Callback to be passed to {@link module:LoginForm|LoginForm}
 * @property {Function} registerOnPress Callback to be used to navigate to `ServiceProviderRegistrationScreen`
 * @property {Boolean} loading Whether {@link module:LoginForm|LoginForm} should display a loading indicator.
 *
 * Passed down to {@link module:RoundButton|RoundButton}
 *
 * @property {Function} onPressGoogleSignin Callback to be passed to {@link module:AltAuthOptions|AltAuthOptions} to sign in via Google.
 * 
 * @see {@link module:LoginScreenContent|LoginScreenContent}
 */

const ServiceProviderLoginScreenContent = (props) => {
	const {
		submitForm,
		registerOnPress,
		backOnPress,
		loading,
		onPressGoogleSignin,
	} = props;

	return (
		<ScrollView
			style={styles.centeredContainer}
			contentContainerStyle={{flexGrow: 1}}
		>
			<Image
				source={require('../../../assets/QQueue_Small.png')}
				style={[
					styles.largeLogo,
					{
						alignSelf: 'center',
						backgroundColor: '#FCDDEC',
						borderWidth: 2,
						borderColor: '#000000',
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
			<AltAuthOptions
				altAuthTitle={'Or login with'}
				onPressGoogleLogin={onPressGoogleSignin}
			></AltAuthOptions>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.subText}>Not a Business? </Text>
				<TouchableOpacity onPress={backOnPress}>
					<Text style={styles.clickableText}>Back</Text>
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
		color: '#000000',
	},
	subtitleText: {
		fontSize: 15,
		color: '#AAAAAA',
	},
	subText: {
		fontSize: 15,
		color: '#000000',
	},
	largeLogo: {
		width: 150,
		height: 150,
	},
	clickableText: {
		color: '#E89575',
		textDecorationLine: 'underline',
	},
});

export default ServiceProviderLoginScreenContent;
