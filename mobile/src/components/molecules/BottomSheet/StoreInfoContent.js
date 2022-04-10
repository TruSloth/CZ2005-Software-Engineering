import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';

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

	const {queueDisabled} = props

	const {
		moreInfoOnPress,
		queueOnPress,
		chatOnPress,
		storeImage,
		heading,
		waitTime,
		subHeading,
		rating,
		numReviews,
		text,
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
				<Text style={styles.rating}>{rating} ⭐ ({numReviews})</Text>
			</View>
			<View style={{flexDirection: 'row'}}>
				<Text style={styles.texts}>
					{text}
				</Text>
				<View style={{flexDirection: 'column'}}>
					<TouchableOpacity
						style={[styles.button, {backgroundColor: queueDisabled ? 'gray': '#8fbc8f'}]}
						disabled={queueDisabled}
						onPress={queueOnPress}
					>
						<Text styles={styles.buttonText}>Queue</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={chatOnPress}
					>
						<Text styles={styles.buttonText}>Chat</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={moreInfoOnPress}
					>
						<Text styles={styles.buttonText}>More Info</Text>
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
		color: '#7879F1',
	},
	subheading: {
		fontSize: 15,
		textAlign: 'left',
		justifyContent: 'flex-start',
		color: '#7879F1',
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
		color: '#7879F1',
		marginBottom: 10,
		marginLeft: '53%',
		fontWeight: 'bold',
	},
	texts: {
		color: '#7879F1',
		width: '70%',
	},
	button: {
		borderRadius: 50,
		borderWidth: 1,
		padding: 8,
		margin: '5%',
		borderColor: '#7879F1',
		alignItems: 'center',
		width: '85%',
		height: '15%',
		alignContent: 'flex-end',
	},
	buttonText: {
		fontWeight: 'bold',
		color: '#7879F1',
	},
	images: {
		width: '100%',
		height: '40%',
		marginTop: 5,
		borderRadius: 10,
	},
});

export default StoreInfoContent;
