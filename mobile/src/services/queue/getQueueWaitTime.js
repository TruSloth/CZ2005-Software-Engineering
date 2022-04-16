import axios from 'axios';

import {LOCALHOST} from '../config';

// Incomplete

export const getQueueWaitTime = async (serviceProviderID, hour) => {
	return await axios.get(`http://${LOCALHOST}/view-queueTimes`, { 
		params: {
				venueID: serviceProviderID,
				hour: hour
		}     
	});
};

