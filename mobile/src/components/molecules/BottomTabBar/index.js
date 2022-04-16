import React from 'react';

import {View, TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';

import {Icon} from 'react-native-elements';

const BottomTabBar = (props) => {
	const {state, descriptors, navigation} = props;

	const pathX = '357';
	const pathY = '640';
	const pathA = '689';
	const pathB = '706';

	return (
    <View style={{flex: 0}}>
      <View style={styles.bottomTabBarContainer}>
			<View style={styles.bottomTabBarBtnContainer}>
				{state.routes.map((route, index) => {
					const {options} = descriptors[route.key];
					console.log(options);
					const label =
						options.tabBarLabel(focused) !== undefined
							? options.tabBarLabel(focused)
							: options.title(focused) !== undefined
							? options.title(focused)
							: route.name;

					const focused = state.index === index;
					console.log(focused);

					const onPress = () => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!focused && !event.defaultPrevented) {
							// The `merge: true` option makes sure that the params inside the tab screen are preserved
							navigation.navigate({
								name: route.name,
								merge: true,
							});
						}
					};

					return (
						<TouchableOpacity
							accessibilityRole='button'
							accessibilityState={focused ? {selected: true} : {}}
							accessibilityLabel={
								options.tabBarAccessibilityLabel
							}
							testID={options.tabBarTestID}
							onPress={onPress}
							style={styles.bottomTabBarButton}
						>
							{options.tabBarIcon(focused)}
							<Text
								style={{
									color: focused ? '#673ab7' : '#AAAAAA',
									alignSelf: 'center',
								}}
							>
								{label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>

			{/* <Svg
				version='1.1'
				id='bottom-bar'
				x='0px'
				y='0px'
				width='100%'
				height='100'
				viewBox='0 0 1092 260'
				//space='preserve'
			>
				<Path
					fill={'#FFF8FA'}
					stroke={'#FFF8FA'}
          d={`M 0 100 H 380 Q 390 100 396 115 A 1 1 0 0 0 696 115 Q 702 100 712 100 H 1092 V 322 H 0 Z`}
          //d={`M 0 100 H 396 a 1 1 0 0 0 300 0 H 1092 V 270 H 0 Z`}
					//d={`M0 ,60h${pathX},3c17,2,0,31,14.4,30,31.6c-0.2,2.7-0.3,5.5-0.3,8.2c0,71.2,58.1,129.6,129.4,130c72.1,0.3,130.6-58,130.6-130c0-2.7-0.1-5.4-0.2-8.1C${pathY}.7,74.5,${pathA}.5,60,${pathB}.7,60H1062c16.6,0,30,13.4,30,30v94c0,42-34,76-76,76H76c-42,0-76-34-76-76V90C0,73.4,13.4,60,30,60z`}
				/>
				<Circle
					fill={'#E89575'}
					stroke={'#E89575'}
					cx='50%'
					cy='115'
					r='115'
				/>
			</Svg> */}
		</View>
    </View>
		
	);
};

const styles = StyleSheet.create({
	bottomTabBarContainer: {
		flexDirection: 'column',
		//zIndex: 0,
		width: Dimensions.get('window').width,
	  //position: 'absolute',
		bottom: '0%',
    //backgroundColor: '#ffffff00'
	},

	bottomTabBarBtnContainer: {
		flexDirection: 'row',
		//backgroundColor: '#FFF8FA',
    //backgroundColor: 'red',
    zIndex: 1,
    //position: "absolute",
    bottom: 5,
	},

	bottomTabBarButton: {
		flex: 1,
		padding: 10,
	},
});

export default BottomTabBar;
