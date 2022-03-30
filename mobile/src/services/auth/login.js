import axios from 'axios';

import {LOCALHOST} from '../config';

/**
 * @memberof auth
 * @function login
 * @async
 * @param {object(email, password)} loginDetails 
 * The login details to be send in the request body.
 * 
 * Login details must contain the `email` and `password`.
 * @returns {response}
 */
export const login = async (loginDetails) => {
	return await axios.post(`http://${LOCALHOST}/users/login/`, {
		email: loginDetails.email,
		password: loginDetails.password,
	});
};

