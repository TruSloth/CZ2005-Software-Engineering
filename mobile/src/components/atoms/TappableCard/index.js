import React from 'react';

import {Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

import {Card} from 'react-native-elements';
import CardDescription from '../CardDescription';

const TappableCard = (props) => {
	const reactNativeLogo = '../../../assets/react-native-logo.png';

	const {cardTitle, cardSubtitle, cardSubtextLine1, cardSubtextLine2} = props;

	return (
		<TouchableOpacity onPress={() => {console.log('opacity pressed')}}>
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
					subtitle={cardSubtitle}
					subtextLine1={cardSubtextLine1}
					subtextLine2={cardSubtextLine2}
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

	tappableCardDescription: {},
});

export default TappableCard;
