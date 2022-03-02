import React from 'react';

import {ScrollView, View} from 'react-native';

import HistoryEntry from '../../molecules/HistoryEntry';

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
