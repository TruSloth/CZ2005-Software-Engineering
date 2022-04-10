import axios from 'axios';

import {LOCALHOST} from '../config';

// Incomplete

export const getQueue = async (serviceProviderID) => {
	return await axios.get(`http://${LOCALHOST}/view-queue`, {
		params: {
			store: serviceProviderID,
		},
	});
};
