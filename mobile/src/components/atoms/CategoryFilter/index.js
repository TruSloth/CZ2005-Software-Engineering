import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

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
