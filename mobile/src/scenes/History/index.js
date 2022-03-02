import React from "react";

import { Button } from "react-native-elements";
import { View } from "react-native";
import HistoryScreenContent from "../../components/organisms/HistoryScreenContent";

const HistoryScreen = () => {
    const reactNativeLogo = 'https://reactjs.org/logo-og.png';

    const data = [
        {
            date: 'Today',
            time: '6:06PM',
            imageSource: reactNativeLogo,
            location: 'Location 1',
            ratings: '4.4 stars (105)',
            points: '+88 Points',
        },
        {
            date: '24 February 2022',
            time: '12:06PM',
            imageSource: reactNativeLogo,
            location: 'Location 2',
            ratings: '4.3 stars (125)',
            points: '+88 Points',
        },
        {
            date: '3 February 2022',
            time: '8:06PM',
            imageSource: reactNativeLogo,
            location: 'Location 1',
            ratings: '4.4 stars (105)',
            points: '+88 Points',
        }
    ]

    return (
        <HistoryScreenContent data={data}></HistoryScreenContent>
    )
}

export default HistoryScreen;