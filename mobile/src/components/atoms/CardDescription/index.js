import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import RoundButton from '../RoundButton';

const CardDescription = (props) => {
	const {title, titleStyle, subtitle, subtitleStyle, subtextLine1, subtextLine1Style, subtextLine2, subtextLine2Style} = props
	return (
		<View style={styles.cardDescriptionBox}>
			<View style={{flexDirection: 'row', justifyContent: "space-between"}}>
				<Text style={titleStyle}>{title}</Text>
				<Text style={subtitleStyle}>{subtitle}</Text>
			</View>
			<View style={styles.subtextBox}>
				<View style={styles.subtext}>
					<Text style={subtextLine1Style}>{subtextLine1}</Text>
					<Text style={subtextLine2Style}>{subtextLine2}</Text>
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