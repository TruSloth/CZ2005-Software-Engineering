import React from 'react';
import {StyleSheet, Text, View, Image, Icon} from 'react-native';

// Change doc to be for HorizontalSectionImage

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

const HorizontalSectionImage = (props) => {
	const {child, style, title, titleStyle, imgsrc} = props;

	return (
		<View style={[styles.horizontalSection, style]}>
			<View style={[styles.row]}>
			{imgsrc ? (<Image 
				style={[styles.tinyLogo]}
				source={imgsrc}
			>
			</Image>) : (<></>)}
			
			<Text style={[titleStyle]}>
				
				{title}</Text>
			</View>
			{child}
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		flexDirection:"row",
		flex:1,
		alignItems: 'center',
		paddingHorizontal: 15
	},
	horizontalSection: {
		borderTopWidth: 2,
		borderBottomWidth: 2,
		borderColor: '#000000',
		padding: 15,
	},
	tinyLogo: {
		marginTop: 5,
		width: 32,
		height: 32,
	},
	title: {
		alignItems: 'center'
	}
});

export default HorizontalSectionImage;
