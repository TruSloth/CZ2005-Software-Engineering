import React from "react";

import { Button } from "react-native-elements";

const AccountScreen = ({navigation}) => {
    return (
        <Button title={"History"} onPress={() => navigation.navigate('History')}></Button>
    )
}

export default AccountScreen;