import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

// Renders a View with horizontal borders above and below the child content

const HorizontalSection = (props) => {
	const {child, style, title, titleStyle} = props;

	return (
		<View style={[styles.horizontalSection, style]}>
			<Text style={titleStyle}>{title}</Text>
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
