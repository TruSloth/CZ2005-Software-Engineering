import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';

const TopBanner = (props) => {
	const {title, subtitle, avatarImage, onLayout, style} = props;

	return (
		<View style={style} onLayout={onLayout}>
			<View style={styles.actionBar}>
				<TouchableOpacity>
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
			<View
				style={[styles.rowContainer, {justifyContent: 'space-between'}]}
			>
				<View>
					<Text style={styles.titleTextBox}>{title}</Text>
					<Text style={styles.subtitleTextBox}>{subtitle}</Text>
				</View>
				<Avatar
					size={64}
					rounded
                    source={{uri: avatarImage}}
					imageProps={styles.avatarImage}
				></Avatar>
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

	subtitleTextBox: {
		marginVertical: 10,
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
	},

	avatarImage: {
		resizeMode: 'contain',
	},
});

export default TopBanner;
