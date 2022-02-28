import React from 'react';
import {StyleSheet, Text, FlatList, View} from 'react-native';
import TappableCard from '../TappableCard';

const HorizontalSection = (props) => {
	const {child, style, title} = props;

	return (
		<View style={[styles.horizontalSection, style]}>
			<Text>{title}</Text>
			{child}
		</View>
	);
};

const styles = StyleSheet.create({
	horizontalSection: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#7879F1',
		padding: 10,
	},
});

export default HorizontalSection;
