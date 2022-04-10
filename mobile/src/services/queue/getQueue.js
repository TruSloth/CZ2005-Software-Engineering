import axios from 'axios';

import {LOCALHOST} from '../config';

export const getQueue = async (serviceProviderID) => {

	return await axios.get(`http://${LOCALHOST}/view-queue`, {
		params: {
            venueID: serviceProviderID,
    }   
	});
};

 