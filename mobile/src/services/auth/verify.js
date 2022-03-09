import axios from 'axios';

import {LOCALHOST} from '../config';

export const verify = async (verificationDetails) => {
	console.log('triggering verify');

    const tempUserName = verificationDetails.tempUserName;

	return axios.post(`http://${LOCALHOST}:4000/users/register/${tempUserName}`, {
        authid: verificationDetails.verificationCode,
	});
};
