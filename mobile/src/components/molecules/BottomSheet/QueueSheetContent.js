import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

/**
 * Renders {@link module:AppBottomSheet|AppBottomSheet} content for queueing functionality.
 * To be passed to `AppBottomSheet`.
 *
 * @category Components
 * @exports QueueSheetContent
 * @subcategory Molecules
 *
 * @example <caption>Default example</caption>
 * 
 * return(
 *   <AppBottomSheet
 * 		renderContent={QueueSheetContent}							
 *		onCloseEnd={() => {console.log('Closed')}}
 *		count={count}
 *		onPressPlus={() => {console.log('Queue was incremented')}}
 *		onPressMinus={() => {console.log('Queue was decremented')}}
 *		onPressConfirm={() => {console.log('Queue was submitted')}}
 *		onPressCancel={() => {console.log('Queue was cancelled')}}
 *   </AppBottomSheet>
 * )
 *
 * @property {Int} count Currently selected number of pax
 * @property {Function} onPressPlus Callback used when queue is incremented
 * @property {Function} onPressMinus Callback used when queue is decremented
 * @property {Function} onPressConfirm Callback used when queue is confirmed
 * @property {Function} onPressCancel Callback used when queue is cancelled or `AppBottomSheet` is closed
 */

const QueueSheetContent = (props) => {
	const {count, onPressPlus, onPressMinus, onPressConfirm, onPressCancel} =
		props;

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Please select no. of pax:</Text>

			<View style={styles.counterContainer}>
				<TouchableOpacity
					style={[styles.counterBtn]}
					onPress={onPressMinus}
				>
					<Text style={styles.btnTextMinus}>-</Text>
				</TouchableOpacity>

				<Text style={styles.count}>{count}</Text>

				<TouchableOpacity
					style={[styles.counterBtn]}
					onPress={onPressPlus}
				>
					<Text style={styles.btnTextPlus}>+</Text>
				</TouchableOpacity>
			</View>
			<View>
				<TouchableOpacity
					style={[styles.submissionBtn]}
					onPress={() => {
						onPressConfirm();
					}}
				>
					<Text style={styles.btnTextConfirm}>Confirm</Text>
				</TouchableOpacity>
				<View style={{width: 15}} />
				<TouchableOpacity
					style={[styles.submissionBtn]}
					onPress={onPressCancel}
				>
					<Text style={styles.btnTextCancel}>Cancel</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 48,
		height: 450,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'stretch',
	},

	counterContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
	},
	counterBtn: {
		marginTop: 15,
		alignItems: 'center',
		justifyContent: 'center',
		height: 75,
		width: 120,
		backgroundColor: '#fff',
		borderColor: '#fff',
	},

	submissionBtn: {
		marginTop: 15,
		alignItems: 'center',
		justifyContent: 'center',
		height: 35,
		borderRadius: 10,
		backgroundColor: '#FCDDEC',
	},

	btnTextPlus: {
		fontWeight: 'bold',
		fontSize: 25,
		color: '#000000',
	},

	btnTextMinus: {
		fontWeight: 'bold',
		fontSize: 25,
		color: '#000000',
	},

	btnTextConfirm: {
		fontWeight: 'bold',
		fontSize: 15,
		color: '#000000',
	},

	btnTextCancel: {
		fontWeight: 'bold',
		fontSize: 15,
		color: '#000000',
	},

	count: {
		fontSize: 80,
		color: '#E89575',
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		fontSize: 25,
		color: '#000000',
		alignSelf: 'center',
	},
});

export default QueueSheetContent;
