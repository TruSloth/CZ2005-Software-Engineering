import axios from 'axios';

import {LOCALHOST} from '../config';

/**
 * @memberof auth
 * @function login
 * @async
 * @param {object(email, password, accountType)} loginDetails
 * The login details to be send in the request body.
 *
 * Login details must contain the `email` and `password`.
 * @returns {response}
 */

export const login = async (loginDetails) => {
	console.log('triggering login');

	return await axios.post(`http://${LOCALHOST}:80/users/login/`, {
		email: loginDetails.email,
		password: loginDetails.password,
		accountType: loginDetails.accountType,
	});
};
