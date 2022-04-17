import axios from 'axios';

import {LOCALHOST} from '../config';

/**
 * @memberof queue
 * @function getQueue
 * @async
 * @param {String} serviceProviderID The unique id of the ServiceProvider whose data is to be retrived from
 * @returns {response}
 */
export const getQueue = async (serviceProviderID) => {

	return await axios.get(`http://${LOCALHOST}/view-queue`, {
		params: {
            venueID: serviceProviderID,
    }   
	});
};

 