import React from 'react';

import {
    Text,
    Button,
    View,
} from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
        <View>
            <Text>Home</Text>
            <Button title={"Press"} onPress={() => navigation.navigate('Login')}></Button>
        </View>
    )
}

export default HomeScreen;