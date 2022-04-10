import axios from 'axios';

import {LOCALHOST} from '../config';

export const advanceQueue = async (queueDetails) => {
	return await axios.post(`http://${LOCALHOST}/push-queue`, {
		venueID: queueDetails.venueID,
		userName: queueDetails.userName
	});
};
