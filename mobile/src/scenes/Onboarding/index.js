import React, {useState, useRef} from 'react';

import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Animated,
	TouchableOpacity,
} from 'react-native';

import Paginator from '../../components/atoms/Paginator';
import OnboardingItem from '../../components/atoms/OnboardingItem';

const OnboardingScreen = ({navigation}) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const scrollX = useRef(new Animated.Value(0)).current;
	const slidesRef = useRef(null);

	const viewableItemsChanged = useRef(({viewableItems}) => {
		setCurrentIndex(viewableItems[0].index);
	}).current;

	const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current; //need be at least 50% before screen change

	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	const data = [
		{
			id: '1',
			title: 'Yae Miko',
			description:
				'Some ambitions have the power to heal wounds, to bring victory, to inspire hope. But some ambitions, outlive their masters, long after their soul ascends.',
			imageSource: {
				uri: reactNativeLogo,
			},
		},

		{
			id: '2',
			title: 'Raiden Shogun',
			description:
				'All the world holds dear is but a backdrop of constant motion. I stand before it alone and unchanging.',
			imageSource: {
				uri: reactNativeLogo,
			},
		},

		{
			id: '3',
			title: 'Sangonomiya Kokomi',
			description:
				'The moon shines bright over the depths of the seas as the tides come and go. It seems that as I go from strength to strength, so does my state of mind flow.',
			imageSource: {
				uri: reactNativeLogo,
			},
		},
	];

	return (
		<View style={styles.container}>
			<View style={{flex: 3}}>
				<FlatList
					data={data}
					renderItem={({item}) => <OnboardingItem item={item} />}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					bounces={false}
					keyExtractor={(item) => item.id}
					onScroll={Animated.event(
						[{nativeEvent: {contentOffset: {x: scrollX}}}],
						{
							useNativeDriver: false,
						}
					)}
					scrollEventThrottle={32}
					onViewableItemsChanged={viewableItemsChanged}
					viewabilityConfig={viewConfig}
					ref={slidesRef}
				/>
			</View>

			<View style={{flex: 0.3}}>
				<Paginator data={data} scrollX={scrollX} />
			</View>

			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity
					style={[styles.btn]}
					onPress={() => navigation.navigate('Registration')}
				>
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 15,
							color: '#493d8a',
						}}
					>
						Register
					</Text>
				</TouchableOpacity>
				<View style={{width: 15}} />
				<TouchableOpacity
					style={[styles.btn]}
					onPress={() => navigation.navigate('Login')}
				>
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 15,
							color: '#493d8a',
						}}
					>
						Login
					</Text>
				</TouchableOpacity>
			</View>
			{/* 
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity
					style={[styles.btn]}
					onPress={() => navigation.navigate('Registration')}
				>
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 15,
							color: '#493d8a',
						}}
					>
						Register
					</Text>
				</TouchableOpacity>
				<View style={{width: 15}} />
				<TouchableOpacity
					style={[styles.btn]}
					onPress={() => navigation.navigate('Login')}
				>
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 15,
							color: '#493d8a',
						}}
					>
						Login
					</Text>
				</TouchableOpacity>
			</View> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0.65,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn: {
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 35,
		width: 120,
		borderRadius: 7,
		marginTop: 10,
		backgroundColor: '#fff',
		borderColor: '#493d8a',
	},
});

export default OnboardingScreen;
