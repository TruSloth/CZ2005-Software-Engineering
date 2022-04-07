import axios from 'axios';

import {LOCALHOST} from '../config';

export const joinQueue = async (joinDetails) => {
	return await axios.post(`http://${LOCALHOST}:80/join-queue`, {
		user: joinDetails.user,
		store: joinDetails.store,
	});
};
