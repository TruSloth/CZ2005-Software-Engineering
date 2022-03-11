import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const QueueSheetContent = (props) => {
	const {count, onPressPlus, onPressMinus, onPressConfirm, onPressCancel} =
		props;

	return (
		<View style={styles.container}>
			<Text style={styles.title2}>Please select no. of pax:</Text>

			<View flexDirection='row'>
				<TouchableOpacity style={[styles.btn1]} onPress={onPressMinus}>
					<Text style={styles.btnTextMinus}>-</Text>
				</TouchableOpacity>

				<Text style={styles.title}>{count}</Text>

				<TouchableOpacity style={[styles.btn1]} onPress={onPressPlus}>
					<Text style={styles.btnTextPlus}>+</Text>
				</TouchableOpacity>
			</View>
			<View>
				<TouchableOpacity
					style={[styles.btn2]}
					onPress={onPressConfirm}
				>
					<Text style={styles.btnTextConfirm}>Confirm</Text>
				</TouchableOpacity>
				<View style={{width: 15}} />
				<TouchableOpacity style={[styles.btn2]} onPress={onPressCancel}>
					<Text style={styles.btnTextCancel}>Cancel</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
		height: 450,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btn1: {
		marginTop: 15,
		alignItems: 'center',
		justifyContent: 'center',
		height: 75,
		width: 120,
		backgroundColor: '#fff',
		borderColor: '#fff',
	},

	btn2: {
		marginTop: 15,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 35,
		width: 120,
		borderRadius: 7,
		backgroundColor: '#fff',
		borderColor: '#493d8a',
	},

	btnTextPlus: {
		fontWeight: 'bold',
		fontSize: 25,
		color: '#493d8a',
	},

	btnTextMinus: {
		fontWeight: 'bold',
		fontSize: 25,
		color: '#493d8a',
	},

	btnTextConfirm: {
		fontWeight: 'bold',
		fontSize: 15,
		color: '#493d8a',
	},

	btnTextCancel: {
		fontWeight: 'bold',
		fontSize: 15,
		color: '#F178B6',
	},

	title: {
		fontSize: 80,
		color: '#493d8a',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title2: {
		fontSize: 25,
		color: '#493d8a',
	},
});

export default QueueSheetContent;
