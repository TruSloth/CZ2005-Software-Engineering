import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

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
	const {imageSource, title, onPress} = props;

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.categoryFilter}>
				<Image
					source={imageSource}
					style={styles.categoryFilterImage}
				></Image>
				<Text style={styles.text}>{title}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	text: {
		color: '#C4C4C4'
	},	
	categoryFilterImage: {
		height: 32,
		width: 32,
	},
	categoryFilter: {
		alignItems: 'center',
		height: 48,
		width: 80
	}
});

export default CategoryFilter;
