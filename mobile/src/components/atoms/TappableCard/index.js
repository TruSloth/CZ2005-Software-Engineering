import React from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';

import {Card} from 'react-native-elements';
import CardDescription from '../CardDescription';

/**
 * Renders a Tile-Card that can be tapped. Uses {@link module:CardDescription|CardDescription} for its content.
 *
 * @category Components
 * @exports TappableCard
 * @subcategory Atoms
 * @see {@link module:CardDescription|CardDescription}
 *
 * @example <caption>Default example</caption>
 * return(
 *   <TappableCard
 * 		cardImage={require('PATH_TO_LOCAL_ASSET')}		
 * 		cardTitle={'Title'}
 * 		cardTitleStyle={{
 *			color: '#000000'
 *		}}
 *		cardSubtitle={'Subtitle'}
 *		cardSubtitleStyle={{
 *			color: '#000000'
 *		}}
 *      cardSubtextLine1={'Subtext Line 1'}
 * 		cardSubtextLine1Style={{
 *			color: '#000000'
 *		}}
 *      cardSubtextLine2={'Subtext Line 2'}
 * 		cardSubtextLine2Style={{
 *			color: '#000000'
 *		}}
 * 		onPress={() => console.log('TappableCard pressed')}
 *		onPressCardDesc={() => console.log('Card Description pressed')}
 *		disableCardDesc={false}
 *   </RoundButton>
 * )
 *
 * @property {String} cardImage ImageURI to the image to be used for `TappableCard`. Must be a local asset and imported using require.
 * @property {String} cardTitle Header text to be passed to `CardDescription`
 * @property {object(style)} cardTitleStyle Header text style passed to `CardDescription`
 * @property {String} cardSubtitle Subheader text to be passed to `CardDescription`
 * @property {object(style)} cardSubtitleStyle Subheader text style passed to `CardDescription`
 * @property {String} cardSubtextLine1 Additional text to be passed to `CardDescription` that appears on the right
 * @property {object(style)} cardSubtextLine1Style Additional text style passed to `CardDescription`. Used for `cardSubtextLine1`
 * @property {String} cardSubtextLine2 Additional text to be passed to `CardDescription` that appears below `cardSubtextLine1`
 * @property {object(style)} cardSubtextLine2Style Additional text style passed to `CardDescription`. Used for `cardSubtextLine2`
 * @property {Function} onPress Callback used when `TappableCard` is pressed
 * @property {Function} onPressCardDesc Callback passed to `CardDescription`
 * @property {Boolean} disableCardDesc Whether {@link module:RoundButton|RoundButton} within `CardDescription` should be hidden
 */

const TappableCard = (props) => {
	const {
		cardImage,
		cardTitle,
		cardTitleStyle,
		cardSubtitle,
		cardSubtitleStyle,
		cardSubtextLine1,
		cardSubtextLine1Style,
		cardSubtextLine2,
		cardSubtextLine2Style,
		onPress,
		onPressCardDesc,
		disableCardDesc
	} = props;

	return (
		<TouchableOpacity onPress={onPress}>
			<Card
				containerStyle={styles.tappableCard}
				wrapperStyle={styles.tappableCardDescription}
			>
				<Card.Image
					style={styles.cardImage}
					source={cardImage ? {uri: cardImage} : require('../../../assets/QQueue_Small.png')}
				/>
				<CardDescription
					title={cardTitle}
					titleStyle={[styles.cardTitle, cardTitleStyle]}
					subtitle={cardSubtitle}
					subtitleStyle={[styles.cardSubtitle, cardSubtitleStyle]}
					subtextLine1={cardSubtextLine1}
					subtextLine1Style={[styles.cardSubtextLine1, cardSubtextLine1Style]}
					subtextLine2={cardSubtextLine2}
					subtextLine2Style={[styles.cardSubtextLine2, cardSubtextLine2Style]}
					onPressCardDesc={onPressCardDesc}
					hideCardButton={disableCardDesc}
				></CardDescription>
			</Card>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	tappableCard: {
		padding: 0,
		marginHorizontal: 5,
		backgroundColor: 'transparent',
		borderWidth: 0,
		elevation: 0
	},

	cardImage: {
		padding: 0, 
		borderColor: '#000000', 
		borderWidth: 2,
		borderRadius: 10
	},

	cardTitle: {
		fontWeight: '700',
		color: '#000000',
		numberOfLines: 1,
		maxWidth: 100,
		ellipsizeMode: 'tail'
	},

	cardSubtitle: {
		color: '#E89575',
	},

	cardSubtextLine1: {
		color: '#C4C4C4',
	},

	cardSubtextLine2: {
		color: '#C4C4C4',
	},
});

export default TappableCard;
