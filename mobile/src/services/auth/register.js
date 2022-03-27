import axios from 'axios';

import {LOCALHOST} from '../config';

/** 
 * @memberof auth
 * @function register
 * @async
 * @param {object(username, email, password, confirmationPassword)} registrationDetails 
 * The registration details to be send in the request body.
 * 
 * Registration details must contain the `userName`, `email`, `password` and `confirmationPassword`.
 * @returns {response}
 */

export const register = async (registrationDetails) => {
	return axios.post(`http://${LOCALHOST}:80/users/register/`, {
		userName: registrationDetails.userName,
		email: registrationDetails.email,
		password: registrationDetails.password,
		confirmationPassword: registrationDetails.password,
	});
};
