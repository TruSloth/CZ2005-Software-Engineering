import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

/**
 * Renders a container with horizontal borders above and below the child content.
 *
 * @category Components
 * @exports HorizontalSection
 * @subcategory Atoms
 *
 * @example <caption>Default example</caption>
 * return(
 *   <HorizontalSection
 * 		style={{
 * 			backgroundColor: '#7879F1'
 *		 }}							
 * 		title={'SectionTitle'}
 * 		titleStyle={{
			color: '#7879F1'
		}}>
		<ChildComponent></ChildComponent>
 *   </HorizontalSection>
 * )
 *
 * @property {ReactNativeComponent} child Component to appear within the `HorizontalSection`
 * @property {object(style)} style Additional style to be passed to `HorizontalSection`
 * @property {String} title Header text for the `HorizontalSection`
 * @property {object(style)} titleStyle Header text style for `title` 
 */

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
