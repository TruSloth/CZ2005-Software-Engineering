import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';

const StoreInfoContent = (props) => {
	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	const {moreInfoOnPress, queueOnPress} = props;

	return (
		<View
			style={styles.container}
		>
			<Image
				style={styles.images}
				source={{uri: reactNativeLogo}}
			></Image>
			<View style={{flexDirection: 'row'}}>
				<Text style={styles.heading}>Location 1 ♡</Text>
				<Text style={[styles.waitTime]}>~15 mins</Text>
			</View>
			<View style={{flexDirection: 'row'}}>
				<Text style={styles.subheading}>8 in queue</Text>
				<Text style={styles.rating}>⭐ 4.4 (505)</Text>
			</View>
			<View style={{flexDirection: 'row'}}>
				<Text style={styles.texts}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua.
				</Text>
				<View style={{flexDirection: 'column'}}>
					<TouchableOpacity
						style={[styles.button, {backgroundColor: '#8fbc8f'}]}
						onPress={queueOnPress}
					>
						<Text styles={styles.buttonText}>Queue</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
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
		alignSelf: 'flex-end',
		marginTop: 20,
		marginBottom: 5,
		marginLeft: '44%',
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
