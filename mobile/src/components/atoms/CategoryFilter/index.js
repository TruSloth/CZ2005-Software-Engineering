import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

/**
 * Renders a tappable image for filtering.
 * 
 * @category Components
 * @exports CategoryFilter
 * @subcategory Atoms
 * 
 * @example <caption>Default example</caption>
 * return(
 *   <CategoryFilter
 * 		imageSource={'IMAGE_URL'}
 * 		title={'filterTitle'}>			
 *   </CategoryFilter>		
 * )
 * 
 * @property {String} imageSource ImageURI to the image to be used for the filter
 * @property {String} title Filter title that appears under filter image
 */

const CategoryFilter = (props) => {
	const {imageSource, title} = props;

	return (
		<View>
			<Image
				source={{uri: imageSource}}
				style={styles.categoryFilterImage}
			></Image>
			<Text>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	categoryFilterImage: {
		height: 32,
		width: 32,
	},
});

export default CategoryFilter;
