import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

/**
 * Renders a tappable image meant for filtering.
 *
 * @category Components
 * @exports CategoryFilter
 * @subcategory Atoms
 *
 * @example <caption>Default example</caption>
 * return(
 *   <CategoryFilter
 * 		imageSource={require('PATH_TO_LOCAL_ASSET')}
 * 		title={'filterTitle'}>
 * 		onPress={() => console.log('CategoryFilter pressed!')}
 *   </CategoryFilter>
 * )
 *
 * @property {String} imageSource ImageURI to the image to be used for the filter. Must be a local asset and imported using require.
 * @property {String} title Filter title that appears under filter image
 * @property {Function} onPress Callback used when the `CategoryFilter` is pressed
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
