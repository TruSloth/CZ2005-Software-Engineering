import axios from 'axios';

import {LOCALHOST} from '../config';

/**
 * @memberof queue
 * @function leaveQueue
 * @async
 * @param {object(userName, venueID)} leaveQueueDetails
 * The leave queue details to be send in the request body.
 *
 * Leave queue details must contain the `userName`, `venueID`.
 * @returns {response}
 */
export const leaveQueue = async (leaveQueueDetails) => {

	return await axios.post(`http://${LOCALHOST}/leave-queue`, {
		userName: leaveQueueDetails.userName,
        venueID: leaveQueueDetails.venueID
	});
};
