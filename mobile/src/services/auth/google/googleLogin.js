import axios from 'axios';

import {LOCALHOST} from '../../config';

/**
 * @memberof auth
 * @function googleLogin
 * @async
 * @param {object(idToken)} userInfo
 * The user information to be send in the request body.
 *
 * UserInfo must contain the `idToken` to be passed to Google Signin.
 * @returns {response}
 */

export const googleLogin = async (userInfo) => {
	return axios.post(`http://${LOCALHOST}/users/login/google`, {
		idToken: userInfo.idToken,
		accountType: userInfo.user.accountType,
	});
};
