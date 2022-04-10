import React from 'react';

import {ScrollView} from 'react-native';

import HistoryEntry from '../../molecules/HistoryEntry';

/**
 * Renders the content for the History Screen.
 *
 * @category Components
 * @exports HistoryScreenContent
 * @subcategory Organisms
 * 
 * @property {object(date, time, imageSource, location, ratings, points)[]} data
 * The data for the user's previously visited locations.
 * 
 * Each entry must contain data on `date`, `time`, `imageSource`, `location`, `ratings` and `points`. 
 * See {@link module:HistoryEntry|HistoryEntry} 	
 */

const HistoryScreenContent = (props) => {
	const {data} = props;

	return (
		<ScrollView>
			{data.map((historyEntry, index) => {
				return (
					<HistoryEntry
						key={index}
						date={historyEntry.date}
						time={historyEntry.time}
						imageSource={historyEntry.imageSource}
						location={historyEntry.location}
						ratings={historyEntry.ratings}
						points={historyEntry.points}
					></HistoryEntry>
				);
			})}
		</ScrollView>
	);
};

export default HistoryScreenContent;
