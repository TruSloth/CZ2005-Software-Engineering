import React, { useEffect, useState } from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { useSelector, useStore } from 'react-redux';
import { useQueryClient } from 'react-query';

/**
 * Renders {@link module:AppBottomSheet|AppBottomSheet} content for short-form Store Info.
 *
 * @category Components
 * @exports StoreInfoContent
 * @subcategory Molecules
 *
 * @example <caption>Default example</caption>
 * 
 * return(
 *   <AppBottomSheet
 		renderContent={StoreInfoContent}							
		onCloseEnd={() => {console.log('Closed')}}
		moreInfoOnPress={() => {console.log('Displaying More info')}}
		queueOnPress={() => {console.log('Opening Queue')}}
		chatOnPress={() => {console.log('Opening Chat')}}
 *   </AppBottomSheet>
 * )
 *
 * @property {Function} moreInfoOnPress Callback used when moreInfo option is pressed
 * @property {Function} queueOnPress Callback used when queue option is pressed
 * @property {Function} chatOnPress Callback used when chat option is pressed
 */

const StoreInfoContent = (props) => {
	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	const {
		moreInfoOnPress,
		queueOnPress,
		chatOnPress,
		venueID,
		storeImage,
		heading,
		waitTime,
		subHeading,
		rating,
		numReviews,
		text,
		queueDisabled
	} = props;

	return (
		<View style={styles.container}>
			<Image
				style={styles.images}
				source={{uri: storeImage || reactNativeLogo}}
			></Image>
			<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
				<Text style={styles.heading}>{heading}</Text>
				<Text style={[styles.waitTime]}>{waitTime}</Text>
			</View>
			<View style={{flexDirection: 'row'}}>
				<Text style={styles.subheading}>{subHeading}</Text>
				<Text style={styles.rating}>{rating
						? rating.$numberDecimal
						: 0} ⭐ ({numReviews})</Text>
			</View>
			<View style={{flexDirection: 'row'}}>
				<Text style={styles.texts}>
					{text}
				</Text>
				<View style={{flexDirection: 'column'}}>
					<TouchableOpacity
						style={[styles.button, {backgroundColor: queueDisabled ? '#C4C4C4': '#8fbc8f'}]}
						disabled={queueDisabled}
						onPress={queueOnPress}
					>
						<Text style={styles.buttonText}>Queue</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={chatOnPress}
					>
						<Text style={styles.buttonText}>Chat</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={moreInfoOnPress}
					>
						<Text style={styles.buttonText}>More Info</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		padding: 16,
		height: 450,
	},

	heading: {
		fontSize: 20,
		textAlign: 'left',
		justifyContent: 'flex-start',
		marginTop: 20,
		marginBottom: 5,
		fontWeight: 'bold',
		color: '#000000',
	},
	subheading: {
		fontSize: 15,
		textAlign: 'left',
		justifyContent: 'flex-start',
		color: '#E89575',
		marginBottom: 10,
		fontWeight: 'bold',
	},
	waitTime: {
		fontSize: 20,
		textAlign: 'right',
		//alignSelf: 'flex-end',
		marginTop: 20,
		marginBottom: 5,
		paddingRight: 8,
		//marginLeft: '44%',
		fontWeight: 'bold',
		color: 'black',
	},
	rating: {
		fontSize: 15,
		textAlign: 'right',
		justifyContent: 'flex-end',
		color: '#E89575',
		marginBottom: 10,
		marginLeft: '53%',
		fontWeight: 'bold',
	},
	texts: {
		color: '#000000',
		width: '70%',
	},
	button: {
		borderRadius: 50,
		padding: 8,
		margin: '5%',
		alignItems: 'center',
		width: '85%',
		height: '15%',
		alignContent: 'flex-end',
		backgroundColor: '#FCDDEC'
	},
	buttonText: {
		fontWeight: 'bold',
		color: '#000000',
	},
	images: {
		width: '100%',
		height: '40%',
		marginTop: 5,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#000000'
	},
});

export default StoreInfoContent;
