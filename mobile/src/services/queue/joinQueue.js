import axios from 'axios';

import {LOCALHOST} from '../config';

/**
 * @memberof queue
 * @function joinQueue
 * @async
 * @param {object(user, store, pax)} joinDetails
 * The join queue details to be send in the request body.
 *
 * Join queue details must contain the `user`, `store`, `pax`.
 * @returns {response}
 */
export const joinQueue = async (joinDetails) => {
	return await axios.post(`http://${LOCALHOST}/join-queue`, {
		user: joinDetails.user,
		store: joinDetails.store,
		pax: joinDetails.pax,
	});
};
