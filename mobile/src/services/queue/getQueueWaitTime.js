import axios from 'axios';

import {LOCALHOST} from '../config';

/**
 * @memberof queue
 * @function getQueueWaitTime
 * @async
 * @param {String} serviceProviderID The unique id of the ServiceProvider whose data is to be retrived from
 * @param {Integer} hour The current hour
 * @returns {response}
 */
export const getQueueWaitTime = async (serviceProviderID, hour) => {
	return await axios.get(`http://${LOCALHOST}/view-queueTimes`, { 
		params: {
				venueID: serviceProviderID,
				hour: hour
		}     
	});
};

