// import React from 'react';
// import {
// 	Button,
// 	Alert,
// 	StyleSheet,
// 	View,
// 	Image,
// 	ScrollView,
// 	Animated,
// 	Text,
// 	Dimensions,
// } from 'react-native';

// const {width} = Dimensions.get('window');
// const OnboardingScreen = ({navigation}) => {
// 	return (
// 		<>
// 			<View style={styles.container}>
// 				<Image
// 					source={{
// 						uri: 'https://progameguides.com/wp-content/uploads/2022/01/Genshin-Impact-Character-Yae-Miko.jpg',
// 					}}
// 					style={{width: 320, height: 320}}
// 				/>
// 			</View>

// 			<View style={styles.box}>
// 				<Text style={styles.title}>Yae Miko </Text>
// 				<ScrollView
// 					style={styles.box}
// 					pagingEnabled={true}
// 					horizontal
// 					showsHorizontalScrollIndicator={false}
// 					decelerationRate={0}
// 				>
// 					<View style={styles.view}>
// 						<Text style={styles.text}>
// 							This is when I first fell in love with her. Because
// 							of how delicate her clothing looked I was certain
// 							she was a catalyst character and I’m glad to be
// 							right. I also believed she would be electro because
// 							of the color of eyes and jewelry. Also glad to be
// 							right on that one. So she was fulfilling exactly
// 							what I wanted from her
// 						</Text>
// 					</View>
// 					<View style={styles.view}>
// 						<Text style={styles.text}>
// 							I was adamant I wanted her but pulled for Raiden
// 							after hearing leak rumors she would be pushed back
// 							until 2022. But I’m actually blown away by how in
// 							love I am with Raiden and currently have a team
// 							composition that does not want to electro units
// 							although I’m certain they will synergize well
// 							together.
// 						</Text>
// 					</View>
// 					<View style={styles.view}>
// 						<Text style={styles.text}>
// 							I’m like holding my breath for her kit to be leaked
// 							so I can finally answer the question which one of
// 							them will be my forever electro queen
// 						</Text>
// 					</View>
// 				</ScrollView>
// 			</View>
// 			<View style={styles.buttonbox}>
// 				<View style={styles.button1}>
// 					<Button
// 						title='Login'
// 						color='#7879F1'
// 						onPress={() => navigation.navigate('Login')}
// 					/>
// 				</View>

// 				<View style={styles.button1}>
// 					<Button
// 						title='Register'
// 						color='#7879F1'
// 						onPress={() => navigation.navigate('Registration')}
// 					/>
// 				</View>
// 			</View>
// 		</>
// 	);
// };

// const loadInformation = () => {
// 	fetch('https://localhost:5000/api/members/1')
// 		.then((response) => response.json())
// 		.then((response) => console.log(response));
// };

// const styles = StyleSheet.create({
// 	container: {
// 		marginTop: 25,
// 		backgroundColor: '#FBE4FF',
// 		flex: 5,
// 		alignItems: 'center', // ignore this - we'll come back to it
// 		justifyContent: 'center', // ignore this - we'll come back to it
// 		flexDirection: 'column',
// 	},
// 	box: {
// 		flex: 2.5,
// 		backgroundColor: '#FBE4FF',
// 	},
// 	buttonbox: {
// 		flex: 2,
// 		flexDirection: 'row',
// 		backgroundColor: '#FBE4FF',
// 	},

// 	button1: {
// 		flex: 1,
// 	},

// 	dotbox: {
// 		flex: 0.5,
// 	},
// 	text: {
// 		// ignore this - we'll come back to it
// 		fontSize: 15,
// 		fontWeight: '300',
// 		textAlign: 'center',
// 		marginTop: 20,
// 		color: '#7879F1',
// 	},
// 	title: {
// 		fontSize: 25,
// 		fontWeight: '500',
// 		textAlign: 'center',
// 		color: '#7879F1',
// 	},
// 	scrollView: {
// 		backgroundColor: 'FBE4FF',
// 	},
// 	view: {
// 		marginLeft: 25,
// 		marginRight: 25,
// 		width: width - 50,
// 		height: 190,
// 		alignItems: 'center',
// 	},
// 	wrapDot: {
// 		flex: 1,
// 		position: 'absolute',
// 		bottom: 0,
// 		flexDirection: 'row',
// 		alignSelf: 'center',
// 		color: 'black',
// 	},
// 	dotActive: {
// 		margin: 3,
// 		color: 'black',
// 	},
// 	dot: {
// 		margin: 3,
// 		color: 'white',
// 	},
// });

// export default OnboardingScreen;
