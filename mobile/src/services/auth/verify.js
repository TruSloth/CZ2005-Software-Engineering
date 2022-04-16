import axios from 'axios';

import {LOCALHOST} from '../config';

/** 
 * @memberof auth
 * @function verify
 * @async
 * @param {object(authid)} verificationDetails 
 * The verification details to be send in the request body.
 * 
 * VerfificationDetails must contain the `authid`.
 * @returns {response}
 */

export const verify = async (verificationDetails) => {
    const tempUserName = verificationDetails.tempUserName;

	return axios.post(`http://${LOCALHOST}/users/register/${tempUserName}`, {
        authid: verificationDetails.verificationCode,
	});
};
