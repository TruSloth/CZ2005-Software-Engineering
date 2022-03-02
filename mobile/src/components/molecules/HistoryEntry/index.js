import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import HorizontalSection from '../../atoms/HorizontalSection';

const HistoryEntry = (props) => {
	const {date, time, imageSource, location, ratings, points} = props;

    console.log(imageSource)

	return (
		<HorizontalSection
			title={date}
            titleStyle={styles.date}
            style={styles.horizontalSection}
			child={
				<View style={styles.historyEntry}>
					<Text style={styles.time}>{time}</Text>
					<View style={styles.row}>
						<Image source={{uri: imageSource}} style={styles.locationImage}></Image>
						<View>
							<Text style={styles.location}>{location}</Text>
							<Text style={styles.ratings}>{ratings}</Text>
						</View>
						<Text style={styles.points}>{points}</Text>
					</View>
				</View>
			}
		></HorizontalSection>
	);
};

const styles = StyleSheet.create({
    horizontalSection: {
        paddingVertical: 20,
        borderTopWidth: 0,
    },  

	historyEntry: {
		flex: 1,
        paddingHorizontal: 10
	},

    date: {
        paddingHorizontal: 10,
        color: '#7879F1',
        fontWeight: '700',
    },

    time: {
        marginVertical: 10,
        color: '#7879F1',
        fontWeight: '700',
    },

    location: {
        marginVertical: 5,
        color: '#7879F1',
        fontWeight: '700',
    },

    ratings: {
        marginVertical: 5,
        color: '#7879F1',
        
    },

    points: {
        color: '#7879F1',
        fontWeight: '700',
    },

	row: {
		flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
	},

    locationImage: {
        width: 96,
        height: 96,
        borderWidth: 1,
        borderColor: '#7879F1',
    },
});

export default HistoryEntry;
