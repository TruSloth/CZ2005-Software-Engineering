import React from 'react';

import {
	ScrollView,
	Image,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import {Shapes} from 'react-native-background-shapes';
import {SafeAreaView} from 'react-native-safe-area-context';

import {LoginForm, AltAuthOptions} from '../../molecules/Auth';

/**
 * Renders the content for the Login Screen.
 *
 * @category Components
 * @exports LoginScreenContent
 * @subcategory Organisms
 *
 * @property {Function} submitForm Callback to be passed to {@link module:LoginForm|LoginForm}
 * @property {Function} registerOnPress Callback to be used to navigate to `RegistrationScreen`
 * @property {Boolean} loading Whether {@link module:LoginForm|LoginForm} should display a loading indicator.
 *
 * Passed down to {@link module:RoundButton|RoundButton}
 *
 * @property {Function} onPressGoogleSignin Callback to be passed to {@link module:AltAuthOptions|AltAuthOptions} to sign in via Google.
 */

const LoginScreenContent = (props) => {
	const {backOnPress} = props;

	const {submitForm, registerOnPress, loading, onPressGoogleSignin} = props;

	// const dimensions = Dimensions.get('window');
	// const imageWidth = dimensions.width;

	return (
		//
		<SafeAreaView style={styles.container}>
			<ScrollView
			//style={styles.centeredContainer}
			//contentContainerStyle={{flexGrow: 1}}
			>
				<View style={styles.sqaure}>
					<Image
						source={require('../../../assets/QQueue_Small.png')}
						style={[
							styles.largeLogo,
							{
								alignSelf: 'center',
								backgroundColor: '#FCDDEC',
								borderWidth: 2,
								borderColor: '#000000',
								marginTop: 30,
								marginBottom: 30,
								width: 230,
								flex: 1,
							},
						]}
					/>
				</View>

				<View style={{flex: 1, justifyContent: 'center'}}>
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
						{`Login to your account`}
					</Text>
				</View>
				<View style={[{marginLeft: 70}, {marginRight: 70}]}>
					<LoginForm
						submitForm={submitForm}
						loading={loading}
					></LoginForm>
				</View>
				<View style={{flex: 1, flexgrow: 1, marginBottom: 20}}>
					<AltAuthOptions
						altAuthTitle={'Or login with'}
						onPressGoogleLogin={onPressGoogleSignin}
					></AltAuthOptions>
				</View>
				<View style={[styles.bottomLinks, {marginTop: 10}]}>
					<Text style={styles.subText}>Not a User? </Text>
					<TouchableOpacity onPress={backOnPress}>
						<Text style={styles.clickableText}>Back</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.bottomLinks}>
					<Text style={styles.subText}>Don't have an account? </Text>
					<TouchableOpacity onPress={registerOnPress}>
						<Text style={styles.clickableText}>Register</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	centeredContainer: {
		alignSelf: 'center',
		flexGrow: 1,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		flexgrow: 1,
		alignSelf: 'center',
		margin: -10,
	},
	titleText: {
		fontSize: 30,
		fontWeight: 'bold',
		color: '#000000',
	},
	subtitleText: {
		fontSize: 15,
		color: '#AAAAAA',
		fontWeight: 'bold',
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
	sqaure: {
		alignSelf: 'center',
		height: 200,
		flex: 1,
		width: 400,
		backgroundColor: '#FCDDEC',
		resizeMode: 'cover',
		marginBottom: 20,
	},
	bottomLinks: {
		flexDirection: 'row',
		paddingLeft: '20%',
	},
});

export default LoginScreenContent;
