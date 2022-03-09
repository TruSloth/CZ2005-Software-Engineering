import axios from 'axios';

import {LOCALHOST} from '../config';

export const register = async (registrationDetails) => {
	console.log('triggering register');

	return axios.post(`http://${LOCALHOST}:4000/users/register/`, {
		userName: registrationDetails.userName,
		email: registrationDetails.email,
		password: registrationDetails.password,
		confirmationPassword: registrationDetails.password,
	});
};
