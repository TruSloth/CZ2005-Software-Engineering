import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import PushNotification from 'react-native-push-notification';

/**
 * Renders a banner to be positioned at the top of the screen. Can optionally contain a action bar.
 *
 * @category Components
 * @exports TopBanner
 * @subcategory Molecules
 *
 * @example <caption>Default example</caption>
 * return(
 *   <TopBanner
 		title={'BannerTitle'}
        subtitle={'BannerSubtitle'}
        avatarImage={'IMAGE_URL'}
        onLayout={() => {
			console.log('Setting layout')
		}}
		settingsOnPress={() => {
			console.log('Settings button was pressed')
		}}							
		leftAvatar={false}
		actionBar={true}
 *   </TopBanner>
 * )
 *
 * @property {String} title Header text to be displayed within `TopBanner`
 * @property {String} subtitle Subheader text found directly below `title`
 * @property {String} avatarImage Avatar Image URL to be used
 * @property {Function} onLayout Callback to be used to set the position of the floating search bar
 * @property {Function} settingsOnPress Callback to be used when the settings button is pressed
 * @property {object(style)} style Additional style to be passed to `TopBanner`
 * @property {object(style)} bannerContentContainerStyle Additional style for the content container
 * @property {object(style)} titleStyle Additional style for `title`
 * @property {object(style)} subtitleStyle Additional style for `subtitle`
 * @property {Boolean} leftAvatar Whether `avatarImage` should appear on the left
 * @property {Boolean} actionBar Whether an action bar should be displayed on top of the content container
 */

const TopBanner = (props) => {
	const {
		title,
		subtitle,
		avatarImage,
		onLayout,
		settingsOnPress,
		chatOnPress,
		style,
		bannerContentContainerStyle,
		titleStyle,
		subtitleStyle,
		leftAvatar,
		actionBar,
	} = props;

	// useEffect(() => {
	// 	handleNotification();
	// });
	// const handleNotification = () => {
	// 	// PushNotification.localNotification({
	// 	// 	channelId: 'test-channel',
	// 	// 	title: "It's your turn!",
	// 	// 	message: 'Please make your way back',
	// 	// 	color: 'red',
	// 	// });
	// 	PushNotification.cancelAllLocalNotifications();
	// 	PushNotification.localNotificationSchedule({
	// 		channelId: 'test-channel',
	// 		title: "It's your turn!",
	// 		message: 'Please make your way back',
	// 		color: 'red',
	// 		date: new Date(Date.now() + 5 * 1000),
	// 		allowWhileIdle: true,
	// 		onlyAlertOnce: 'true',
	// 		// repeatType: 'time',
	// 		// repeatTime: 120 * 1000,
	// 	});
	// };
	return (
		<View style={style} onLayout={onLayout}>
			{actionBar ? (
				<View style={styles.actionBar}>
					<TouchableOpacity onPress={settingsOnPress}>
						<Icon
							name={'settings'}
							tvParallaxProperties={undefined}
							style={styles.iconHorizontalPadding}
							iconStyle={styles.iconStyle}
						></Icon>
					</TouchableOpacity>

					<View style={[styles.rowContainer, {paddingRight: 0}]}>
						<TouchableOpacity>
							<Icon
							name='notifications-none'
								tvParallaxProperties={undefined}
								style={styles.iconHorizontalPadding}
								iconStyle={styles.iconStyle}
							></Icon>
						</TouchableOpacity>
						<TouchableOpacity>
							<Icon
								name='favorite-outline'
								tvParallaxProperties={undefined}
								style={styles.iconHorizontalPadding}
								iconStyle={styles.iconStyle}
							></Icon>
						</TouchableOpacity>
						<TouchableOpacity onPress={chatOnPress}>
							<Icon
								name='chat-bubble-outline'
								tvParallaxProperties={undefined}
									style={styles.iconHorizontalPadding}
									iconStyle={styles.iconStyle}
								></Icon>
						</TouchableOpacity>

						{/* <TouchableOpacity onPress={BizProfileOnPress}>
							<Icon
								name={'user'}
								type={'feather'}
								tvParallaxProperties={undefined}
								style={styles.iconHorizontalPadding}
								iconStyle={styles.iconStyle}
							></Icon>
						</TouchableOpacity>

						<TouchableOpacity>
							<Icon
								name='favorite-outline'
								tvParallaxProperties={undefined}
								style={styles.iconHorizontalPadding}
								iconStyle={styles.iconStyle}
							></Icon>
						</TouchableOpacity>
						<TouchableOpacity>
							<Icon
								name='text-snippet'
								tvParallaxProperties={undefined}
								style={styles.iconHorizontalPadding}
								iconStyle={styles.iconStyle}
							></Icon>
						</TouchableOpacity> */}
					</View>
				</View>
			) : (
				<></>
			)}

			<View style={[styles.rowContainer, bannerContentContainerStyle]}>
				{leftAvatar ? (																								
					<Avatar
						size={64}
						rounded
						source={avatarImage}
						imageProps={styles.avatarImage}
					></Avatar>
				) : (
					<></>
				)}
				<View>
					<Text style={[styles.titleTextBox, titleStyle]}>
						{title}
					</Text>
					<Text style={[styles.subtitleTextBox, subtitleStyle]}>
						{subtitle}
					</Text>
				</View>

				{leftAvatar ? (
					<></>
				) : (
					<Avatar
						size={64}
						rounded
						source={avatarImage}
						imageProps={styles.avatarImage}
					></Avatar>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	iconHorizontalPadding: {
		paddingHorizontal: 5,
	},

	iconStyle: {
		color: '#000000',
	},

	titleTextBox: {
		marginVertical: 10,
		color: '#000000',
		fontSize: 32,
		fontWeight: 'bold',
	},

	titleTextBoxTight: {
		marginVertical: 5,
		color: '#7879F1',
		fontSize: 32,
	},

	subtitleTextBox: {
		marginVertical: 10,
		color: '#7879F1',
	},

	subtitleTextBoxTight: {
		marginVertical: 5,
		color: '#7879F1',
	},

	actionBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 10,
	},

	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		justifyContent: 'space-between',
	},

	avatarImage: {
		resizeMode: 'contain',
	},
});

export default TopBanner;
