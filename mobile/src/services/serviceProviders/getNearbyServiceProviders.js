import axios from 'axios';

import {LOCALHOST} from '../config';

// Incomplete

export const getNearbyServiceProviders = async (locationDetails) => {
	return await axios.get(`http://${LOCALHOST}:4000/INCOMPLETE_URL`, {
        lat: locationDetails.lat,
        lng: locationDetails.lng,
	});
};
