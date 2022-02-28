import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import RoundButton from '../RoundButton';

const CardDescription = (props) => {
	const {title, subtitle, subtextLine1, subtextLine2} = props
	return (
		<View style={styles.cardDescriptionBox}>
			<View style={{flexDirection: 'row', justifyContent: "space-between"}}>
				<Text>{title}</Text>
				<Text>{subtitle}</Text>
			</View>
			<View style={styles.subtextBox}>
				<View style={styles.subtext}>
					<Text>{subtextLine1}</Text>
					<Text>{subtextLine2}</Text>
				</View>
				<RoundButton title={'Queue'} onPress={() => {console.log('button pressed')}} style={styles.queueButton}></RoundButton>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardDescriptionBox: {
		paddingHorizontal: 10,
		paddingVertical: 5,
		backgroundColor: 'transparent'
	},

	subtextBox: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	queueButton: {
		borderWidth: 0,
		backgroundColor: "#FCDDEC",
	},

	subtext: {
		marginRight: 20,
		flexDirection: 'column'
	}
})

export default CardDescription;
