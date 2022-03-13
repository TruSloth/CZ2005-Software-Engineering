import React from 'react';

import AnimatedSplash from 'react-native-animated-splash-screen';

const SplashScreen = (props) => {
	return (
		<AnimatedSplash
			translucent={true}
            isLoaded={false}
			logoImage={require('../../assets/react-native-logo.png')}
            backgroundColor={'#FCDDEC'}
		></AnimatedSplash>
	);
};

export default SplashScreen
