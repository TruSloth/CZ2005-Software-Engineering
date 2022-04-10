import React from 'react';
import {View, Animated, useWindowDimensions, StyleSheet} from 'react-native';

/**
 * @todo Fill up description
 *
 * @category Components
 * @exports Paginator
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

const Paginator = ({data, scrollX}) => {
	const {width} = useWindowDimensions();
	return (
		<View style={{flexDirection: 'row', height: 64}}>
			{data.map((_, i) => {
				const inputRange = [
					(i - 1) * width,
					i * width,
					(i + 1) * width,
				];

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 20, 10],
					extrapolate: 'clamp',
				});
				return (
					<Animated.View
						style={[styles.dot, {width: dotWidth}]}
						key={i.toString()}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	dot: {
		height: 10,
		borderRadius: 5,
		backgroundColor: '#493d8a',
		marginHorizontal: 8,
	},
});

export default Paginator;
