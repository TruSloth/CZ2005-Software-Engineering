import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import HorizontalSection from '../../atoms/HorizontalSection';

const HorizontalBlock = (props) => {
	const {blockTitle, blockElements, blockTitleStyle, blockElementTitlesStyle, style} = props;

	return (
		<HorizontalSection
            style={[styles.horizontalBlock, style]}
            titleStyle={[styles.horizontalBlockTitle, blockTitleStyle]}
			title={blockTitle}
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
		></HorizontalSection>
	);
};

const styles = StyleSheet.create({
	horizontalBlock: {
		padding: 0,
        backgroundColor: '#A5A6F6',
		borderTopWidth: 0,
		borderBottomWidth: 0
	},

    horizontalBlockTitle: {
        margin: 10,
        color: '#FCDDEC'
    },

    horizontalBlockElement: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 0,
    },

    horizontalBlockElementTitle: {
        color: '#7879F1'
    }
});

export default HorizontalBlock;
