import axios from 'axios';

import {LOCALHOST} from '../config';

// Incomplete

export const getQueue = async (serviceProviderDetails) => {
	return await axios.get(`http://${LOCALHOST}:80/view-queue`, {
		store: serviceProviderDetails.store,
	});
};
