import React from 'react';

import {Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

import {Card} from 'react-native-elements';
import CardDescription from '../CardDescription';

const TappableCard = (props) => {
	const reactNativeLogo = '../../../assets/react-native-logo.png';

	const {cardTitle, cardSubtitle, cardSubtextLine1, cardSubtextLine2, onPress, onPressCardDesc} = props;

	return (
		<TouchableOpacity onPress={onPress}>
			<Card
				containerStyle={styles.tappableCard}
				wrapperStyle={styles.tappableCardDescription}
			>
				<Card.Image
					style={{padding: 0, borderColor: '#7879F1', borderWidth: 2}}
					source={require(reactNativeLogo)}
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
	},

	cardSubtitle: {
		color: '#7879F1',
	},

	cardSubtextLine1: {
		color: '#7879F1',
	},

	cardSubtextLine2: {
		color: '#7879F1',
	}
});

export default TappableCard;
