import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

import HorizontalSection from '../../atoms/HorizontalSection';
import HorizontalSectionImage from '../../atoms/HorizontalSectionImage';

/**
 * Renders a composite component that enhances a HorizontalSection with a header portion, and multiple child sections.
 *
 * @category Components
 * @exports HorizontalBlock
 * @subcategory Molecules
 *
 * @example <caption>Default example</caption>
 * return(
 *   <HorizontalBlock
 		blockTitle={HorizontalBlockTitle}
		blockElements={[
			{
				title: 'blockElement1',
				onPress: () => {console.log('blockElement1 pressed)}
			},
			{
				title: 'blockElement2',
				onPress: () => {console.log('blockElement2 pressed)}
			}
		]}
		blockTitleStyle={{
			color: '#FCDDEC'
		}}
		blockElementTitlesStyle={{
			color: '#A5A6F6'
		}}							
 *   </HorizontalBlock>
 * )
 *
 * @property {String} blockTitle Header text to be displayed for `HorizontalBlock`
 * @property {object(title, onPress)[]} blockElements 
 * Array of items to be included in `HorizontalBlock`.
 * 
 * Each `blockElement` must have a `title` and a `onPress` callback
 * 
 * @property {object(style)} blockTitleStyle Additional style to be used for `blockTitle`
 * @property {object(style)} blockElementTitlesStyle Additional style to be used for `title` for each `blockElement`
 * @property {object(style)} style Additional style to be used for `HorizontalBlock`
 */


const HorizontalBlock = (props) => {
	const {blockTitle, blockElements, blockTitleStyle, blockElementTitlesStyle, style, appLogo} = props;

	return (
		
		<HorizontalSectionImage
            style={[styles.horizontalBlock, style]}
            titleStyle={[styles.horizontalBlockTitle, blockTitleStyle]}
			title={blockTitle}
			imgsrc = {appLogo}
			child={blockElements.map((element, key) => {
				return (
					<TouchableOpacity onPress={() => element.onPress()} key={key}>
						<HorizontalSection
                            style={styles.horizontalBlockElement}
                            titleStyle={[styles.horizontalBlockElementTitle, blockElementTitlesStyle]}
							title={element.title}
						></HorizontalSection>
					</TouchableOpacity>
				);
			})}
		></HorizontalSectionImage>
	);
};

const styles = StyleSheet.create({
	horizontalBlock: {
		padding: 0,
        backgroundColor: '#FCDDEC',
		borderTopWidth: 0,
		borderBottomWidth: 0
	},

    horizontalBlockTitle: {
        margin: 10,
        color: '#000000'
		
    },

    horizontalBlockElement: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
    },

    horizontalBlockElementTitle: {
        color: '#AAAAAA'
    }
});

export default HorizontalBlock;
