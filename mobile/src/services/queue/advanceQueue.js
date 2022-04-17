import axios from 'axios';

import {LOCALHOST} from '../config';

/**
 * @memberof queue
 * @function advanceQueue
 * @async
 * @param {object(venueID, userName)} queueDetails 
 * The queue details to be send in the request body.
 *
 * Queue details must contain the `venueID`, `userName`.
 * @returns {response}
 */
export const advanceQueue = async (queueDetails) => {
	return await axios.post(`http://${LOCALHOST}/push-queue`, {
		venueID: queueDetails.venueID,
		userName: queueDetails.userName
	});
};
