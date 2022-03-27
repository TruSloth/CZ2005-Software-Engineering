import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RoundButton from '../RoundButton';

/**
 * 
 * Renders the content for a Card.
 * 
 * @category Components
 * @exports CardDescription
 * @subcategory Atoms
 * 
 * @example <caption>Default example</caption>
 * return(
 *   <CardDescription
 * 	title={'cardTitle'}
 * 	titleStyle={{
 *		fontWeight: '700',
 *		color: '#7879F1',
 *	}}
 * 	subtitle={'cardSubtitle'}
 * 	subtitleStyle={{
 *		color: '#7879F1',
 *	}}
 * 	subtextLine1={'SubtextLine1'}
 *	subtextLine1Style={{
 *		color: '#7879F1',
 *	}}
 *	subtextLine2={'SubtextLine2'}	
 *	subtextLine2Style={{
 *		color: '#7879F1',
 *	}}
 *	onPressCardDesc={() => console.log('CardDesc Pressed')}>
 *   </CardDescription>
 * )
 * 
 * @property {String} title Header text passed to the card description
 * @property {object(style)} titleStyle Header text style passed to `title`
 * @property {String} subtitle Subheader text passed to the card description that appears directly below `title`
 * @property {object(style)} subtitleStyle Subheader text style passed to `subtitle`
 * @property {String} subtextLine1 Additional text that appears on the right side of card description.
 * @property {object(style)} subtextLine1Style Subtext text style passed to `subtextLine1`
 * @property {String} subtextLine2 Additional text that appears on the right side of card description, directly below `subtextLine1`
 * @property {object(style)} subtextLine2Style Subtext text style passed to `subtextLine2`
 * @property {Function} onPressCardDesc Callback used when `CardDescription` is pressed
 */

const CardDescription = (props) => {
	const {
		title,
		titleStyle,
		subtitle,
		subtitleStyle,
		subtextLine1,
		subtextLine1Style,
		subtextLine2,
		subtextLine2Style,
		onPressCardDesc,
	} = props;
	return (
		<View style={styles.cardDescriptionBox}>
			<View
				style={{flexDirection: 'row', justifyContent: 'space-between'}}
			>
				<Text style={titleStyle}>{title}</Text>
				<Text style={subtitleStyle}>{subtitle}</Text>
			</View>
			<View style={styles.subtextBox}>
				<View style={styles.subtext}>
					<Text style={subtextLine1Style}>{subtextLine1}</Text>
					<Text style={subtextLine2Style}>{subtextLine2}</Text>
				</View>
				<RoundButton
					title={'Queue'}
					onPress={() => onPressCardDesc()}
					style={styles.queueButton}
				></RoundButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardDescriptionBox: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		backgroundColor: 'transparent',
	},

	subtextBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	queueButton: {
		borderWidth: 0,
		backgroundColor: '#FCDDEC',
	},

	subtext: {
		marginRight: 20,
		flexDirection: 'column',
	},
});

export default CardDescription;
