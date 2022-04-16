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
	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	const {
		cardImage,
		cardTitle,
		cardSubtitle,
		cardSubtextLine1,
		cardSubtextLine2,
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
					style={{padding: 0, borderColor: '#7879F1', borderWidth: 2}}
					source={{uri: cardImage || reactNativeLogo}}
				/>
				<CardDescription
					title={cardTitle}
					titleStyle={styles.cardTitle}
					subtitle={cardSubtitle}
					subtitleStyle={styles.cardSubtitle}
					subtextLine1={cardSubtextLine1}
					subtextLine1Style={styles.cardSubtextLine1}
					subtextLine2={cardSubtextLine2}
					subtextLine2Style={styles.cardSubtextLine2}
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
	},

	cardTitle: {
		fontWeight: '700',
		color: '#7879F1',
		numberOfLines: 1,
		maxWidth: 100,
		ellipsizeMode: 'tail'
	},

	cardSubtitle: {
		color: '#7879F1',
	},

	cardSubtextLine1: {
		color: '#7879F1',
	},

	cardSubtextLine2: {
		color: '#7879F1',
	},
});

export default TappableCard;
