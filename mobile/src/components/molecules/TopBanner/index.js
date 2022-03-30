import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';

// Renders a banner to be positioned at the top of the screen. Can optionally contain a action bar.

const TopBanner = (props) => {
	const {
		title,
		subtitle,
		avatarImage,
		onLayout,
		settingsOnPress,
		BizHomeOnPress,
		BizProfileOnPress,
		style,
		bannerContentContainerStyle,
		titleStyle,
		subtitleStyle,
		leftAvatar,
		actionBar,
	} = props;

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

					{/* <TouchableOpacity onPress={BizHomeOnPress}>
						<Icon
							name={'briefcase'}
							type={'feather'}
							tvParallaxProperties={undefined}
							style={styles.iconHorizontalPadding}
							iconStyle={styles.iconStyle}
						></Icon>
					</TouchableOpacity>

					<TouchableOpacity onPress={BizProfileOnPress}>
						<Icon
							name={'user'}
							type={'feather'}
							tvParallaxProperties={undefined}
							style={styles.iconHorizontalPadding}
							iconStyle={styles.iconStyle}
						></Icon>
					</TouchableOpacity> */}

					<View style={[styles.rowContainer, {paddingRight: 0}]}>
						<TouchableOpacity onPress={BizHomeOnPress}>
							<Icon
								name={'briefcase'}
								type={'feather'}
								tvParallaxProperties={undefined}
								style={styles.iconHorizontalPadding}
								iconStyle={styles.iconStyle}
							></Icon>
						</TouchableOpacity>

						<TouchableOpacity onPress={BizProfileOnPress}>
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
						</TouchableOpacity>
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
						source={{uri: avatarImage}}
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
						source={{uri: avatarImage}}
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
		color: '#7879F1',
	},

	titleTextBox: {
		marginVertical: 10,
		color: '#7879F1',
		fontSize: 32,
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
