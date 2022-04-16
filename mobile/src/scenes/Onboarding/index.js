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
			title: 'QQueue',
			description:
				'Use the app to check for crowdiness and to queue online.',
			imageSource: require('../../assets/QQueue_Onboarding_1.png'),
		},

		{
			id: '2',
			title: 'Save time',
			description:
				'Make use of the your time better somewhere instead of queuing physically.',
			imageSource: require('../../assets/QQueue_Onboarding_2.png'),
		},

		{
			id: '3',
			title: 'Redeem rewards',
			description:
				'Earn points for each queue and redeem rewards.',
			imageSource: require('../../assets/QQueue_Onboarding_3.png'),
		},
	];

	const [authOption, setAuthOption] = useState(null);

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
			{authOption ? (
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity
						style={[styles.btn]}
						onPress={() => {
							if (authOption === 'Registration') {
								navigation.navigate('Registration');
							}

							if (authOption === 'Login') {
								navigation.navigate('Login', {accountType: 'User'});
							}
						}}
					>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 15,
								color: '#493d8a',
							}}
						>
							User
						</Text>
					</TouchableOpacity>
					<View style={{width: 15}} />
					<TouchableOpacity
						style={[styles.btn]}
						onPress={() => {
							if (authOption === 'Registration') {
								navigation.navigate(
									'ServiceProviderRegistration'
								);
							}

							if (authOption === 'Login') {
								navigation.navigate('ServiceProviderLogin', {accountType: 'Business'});
							}
						}}
					>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 15,
								color: '#493d8a',
							}}
						>
							Business
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={{flexDirection: 'row'}}>
					<TouchableOpacity
						style={[styles.btn]}
						onPress={() => setAuthOption('Registration')}
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
						onPress={() => setAuthOption('Login')}
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
			)}
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
		backgroundColor: '#fff',
		borderColor: '#493d8a',
	},
});

export default OnboardingScreen;
