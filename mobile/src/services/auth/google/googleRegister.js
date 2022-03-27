import axios from 'axios';

import {LOCALHOST} from '../../config';

/** 
 * @memberof auth
 * @function googleRegister
 * @async
 * @param {object(idToken)} userInfo 
 * The user information to be send in the request body.
 * 
 * UserInfo must contain the `idToken` to be passed to Google Signin.
 * @returns {response}
 */

export const googleRegister = async (userInfo) => {
	return axios.post(`http://${LOCALHOST}:80/users/register/google`, {
		idToken: userInfo.idToken,
	});
};
