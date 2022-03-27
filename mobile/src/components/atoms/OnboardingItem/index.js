import React from 'react';

import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';

/**
 * Content to be used for {@link module:Paginator|Paginator}.
 *
 * @category Components
 * @exports OnboardingItem
 * @subcategory Atoms
 *
 * @example <caption>Default example</caption>
 * return(
 *   <OnboardingItem							
 * 		item={{
			imageSource: 'IMAGE_URL',
			title: 'itemTitle',
			description: 'itemDescription'
		}}
 *   </OnboardingItem>
 * )
 *
 * @property {object(imageSource, title, description)} item 
 * The item data to be used.
 *  
 * Must contain an image URI, title text and text description
 */

const OnboardingItem = ({item}) => {
	const {width} = useWindowDimensions();
	return (
		<View style={[styles.container, {width}]}>
			<Image
				source={{uri: item.imageSource}}
				style={[styles.image, {width, resizeMode: 'contain'}]}
			/>

			<View style={{flex: 0.3}}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.description}>{item.description}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	image: {
		flex: 0.7,
		justifyContent: 'center',
	},

	title: {
		fontWeight: '800',
		fontSize: 28,
		marginBottom: 10,
		color: '#493d8a',
		textAlign: 'center',
	},

	description: {
		fontWeight: '300',
		color: '#62656b',
		textAlign: 'center',
		paddingHorizontal: 64,
	},
});

export default OnboardingItem;
