import React, {useEffect, useRef, useState} from 'react';

import {
	Text,
	View,
	StyleSheet,
	TextInput,
	Image,
	Modal,
	Alert,
	Pressable,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
const CustomerDetailsScreenContent = (props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const RemoveCustomerOnPress = () => {
		setModalVisible(true);
	};
	const {navigation, joinServiceProviderQueue} = props;

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.heading}>Queue details</Text>
				<View style={styles.sameRow}>
					<Text style={styles.TotalPax}>3</Text>
					<Image
						style={styles.largeLogo}
						source={require('../../../assets/group.png')}
					/>
				</View>
			</View>
			<View style={styles.horLine} />

			<View style={styles.customer}>
				<View>
					<Text style={styles.subheading}>Sally Lim</Text>
				</View>
				<View style={styles.innerContainer}>
					<Text style={styles.paxNo}>6</Text>
					<Image
						style={styles.logo}
						source={require('../../../assets/group.png')}
					/>
					<TouchableOpacity style={styles.firstContact}>
						<Icon
							size={40}
							name='bell'
							type='evilicon'
							color='#7879F1'
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.secondContact}>
						<Icon
							size={27}
							name='phone'
							type='feather'
							color='#7879F1'
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.thirdContact}
						onPress={RemoveCustomerOnPress}
					>
						<Icon
							size={27}
							name='user-minus'
							type='feather'
							color='#7879F1'
						/>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.horLine} />

			<View style={styles.customer}>
				<View>
					<Text style={styles.subheading}>Ben Tan</Text>
				</View>
				<View style={styles.innerContainer}>
					<Text style={styles.paxNo}>3</Text>
					<Image
						style={styles.logo}
						source={require('../../../assets/group.png')}
					/>
					<TouchableOpacity style={styles.firstContact}>
						<Icon
							size={40}
							name='bell'
							type='evilicon'
							color='#7879F1'
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.secondContact}>
						<Icon
							size={27}
							name='phone'
							type='feather'
							color='#7879F1'
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.thirdContact}
						onPress={RemoveCustomerOnPress}
					>
						<Icon
							size={27}
							name='user-minus'
							type='feather'
							color='#7879F1'
						/>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.horLine} />

			<View style={styles.customer}>
				<View>
					<Text style={styles.subheading}>Lee Kum Kee</Text>
				</View>
				<View style={styles.innerContainer}>
					<Text style={styles.paxNo}>2</Text>
					<Image
						style={styles.logo}
						source={require('../../../assets/group.png')}
					/>
					<TouchableOpacity style={styles.firstContact}>
						<Icon
							size={40}
							name='bell'
							type='evilicon'
							color='#7879F1'
						/>
					</TouchableOpacity>
					<TouchableOpacity style={styles.secondContact}>
						<Icon
							size={27}
							name='phone'
							type='feather'
							color='#7879F1'
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.thirdContact}
						onPress={RemoveCustomerOnPress}
					>
						<Icon
							size={27}
							name='user-minus'
							type='feather'
							color='#7879F1'
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.horLine} />

			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}
			>
				<View
					style={[
						{backgroundColor: 'rgba(0,0,0,0.5)'},
						{flex: 1},
						{justifyContent: 'center'},
					]}
				>
					<View style={styles.modal}>
						<Text style={styles.modalTitle}>
							Are you sure you want to remove Sally Lim from the
							queue?
						</Text>

						<Image
							style={styles.modalLogo}
							source={require('../../../assets/group.png')}
						/>
						<View style={{flexDirection: 'row'}}>
							<Pressable
								style={styles.modalButton}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.modalButtonText}>Yes</Text>
							</Pressable>

							<Pressable
								style={styles.modalButton}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.modalButtonText}>No</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		//paddingTop: Constants.statusBarHeight,
		backgroundColor: 'white',
		padding: 8,
	},
	modalLogo: {
		height: 50,
		width: 50,
		margin: 15,
		alignSelf: 'center',
	},
	modalButtonText: {
		fontWeight: 'bold',
		fontSize: 15,
		color: '#7879F1',
		justifyContent: 'center',
	},
	modalButton: {
		borderRadius: 5,
		borderWidth: 1,
		paddingVertical: 5,
		paddingHorizontal: 5,
		borderColor: 'transparent',
		alignItems: 'center',
		margin: 20,
		backgroundColor: 'pink',
		width: '30%',
		height: '50%',
		display: 'flex',
	},
	modal: {
		backgroundColor: 'white',
		margin: 50,
		padding: 30,
		borderRadius: 30,
		flex: 0.4,

		alignItems: 'center',
	},
	modalTitle: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#7879F1',
	},
	TotalPax: {
		fontSize: 50,
		fontWeight: 'bold',
		margin: 15,
		color: '#7879F1',
	},
	largeLogo: {
		height: 100,
		width: 100,
	},
	sameRow: {
		flexDirection: 'row',
	},
	customer: {
		marginLeft: 10,
	},
	input: {
		height: 40,
		margin: 12,
		padding: 10,
		borderWidth: 0.5,
		borderRadius: 10,
		borderColor: '#7879F1',
	},
	buttonList: {
		marginTop: '10%',
		margin: 5,
		justifyContent: 'center',
	},
	button: {
		borderRadius: 5,
		borderWidth: 1,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderColor: 'transparent',
		alignItems: 'center',
		marginTop: 10,
		backgroundColor: 'pink',
		width: '100%',
		height: '70%',
		display: 'flex',
	},
	textButton: {
		fontWeight: 'bold',
		fontSize: 20,
		color: '#7879F1',
	},
	heading: {
		margin: 10,
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'left',
		justifyContent: 'flex-end',
		position: 'relative',
		color: '#7879F1',
		marginBottom: 10,
		textAlignVertical: 'top',
	},
	firstContact: {
		height: 50,
		width: 50,
		//marginLeft: '30%',
		//marginRight: 0,
		marginLeft: 140,
	},
	secondContact: {
		height: 50,
		width: 50,
	},
	thirdContact: {
		height: 30,
		width: 30,
		marginLeft: 10,
	},
	innerContainer: {
		justifyContent: 'flex-start',
		flexDirection: 'row',
		textAlign: 'left',
	},
	subheading: {
		//active queue
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'left',
		color: '#7879F1',
		left: 0,
	},
	paxNo: {
		marginRight: 10,
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'left',
		color: '#7879F1',
		marginBottom: 10,
	},

	logo: {
		height: 50,
		width: 50,
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
	},
	horLine: {
		borderBottomColor: '#7879F1',
		borderBottomWidth: 1,
		marginTop: 10,
		marginBottom: 10,
	},
});

export default CustomerDetailsScreenContent;
