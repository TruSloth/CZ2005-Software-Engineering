import React from 'react';

import {Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

import {Card} from 'react-native-elements';
import CardDescription from '../CardDescription';

/**
 * Renders a Tile-Card that can be tapped. Uses {@link module:CardDescription|CardDescription} for its content.
 *
 * @category Components
 * @exports TappableCard
 * @subcategory Atoms
 *
 * @example <caption>Default example</caption>
 * return(
 *   <RoundButton							
 * 		style={{
			backgroundColor: '#7879F1'
 		}}
		title={'Submit'}
		onPress={() => {console.log('Button Pressed')}}
		loading={false}
 *   </RoundButton>
 * )
 *
 * @property {String} cardTitle Header text to be passed to `CardDescription`
 * @property {String} cardSubtitle Subheader text to be passed to `CardDescription`
 * @property {String} cardSubtextLine1 Additional text to be passed to `CardDescription` that appears on the right
 * @property {String} cardSubtextLine2 Additional text to be passed to `CardDescription` that appears below `cardSubtextLine1`
 * @property {Function} onPress Callback used when `TappableCard` is pressed
 * @property {Function} onPressCardDesc Callback passed to `CardDescription`
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
