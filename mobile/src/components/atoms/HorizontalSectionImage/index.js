import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

/**
 * Renders a container with horizontal borders above and below the child content and a image on the left of the `title`. 
 *
 * @category Components
 * @exports HorizontalSectionImage
 * @subcategory Atoms
 * @see {@link module:HorizontalSection|HorizontalSection}
 *
 * @example <caption>Default example</caption>
 * return(
 *   <HorizontalSectionImage
 * 		style={{
 * 			backgroundColor: '#FFFFFF'
 *		 }}							
 * 		title={'SectionTitle'}
 * 		titleStyle={{
			color: '#000000'
		}}>
		imgsrc={require('PATH_TO_LOCAL_ASSET')}
		child={<ChildComponent></ChildComponent>}
 *   </HorizontalSectionImage>
 * )
 *
 * @property {ReactNativeComponent} child Component to appear within the `HorizontalSection`
 * @property {object(style)} style Additional style to be passed to `HorizontalSection`
 * @property {String} title Header text for the `HorizontalSection`
 * @property {object(style)} titleStyle Header text style for `title` 
 * @property {String} imgsrc ImageURI to the image to be used for the filter. Must be a local asset and imported using require.
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
