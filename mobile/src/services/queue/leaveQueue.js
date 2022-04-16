import axios from 'axios';

import {LOCALHOST} from '../config';

export const leaveQueue = async (leaveQueueDetails) => {

	return await axios.post(`http://${LOCALHOST}/leave-queue`, {
		userName: leaveQueueDetails.userName,
        venueID: leaveQueueDetails.venueID
	});
};
