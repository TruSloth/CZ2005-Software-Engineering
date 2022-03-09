import axios from 'axios';

import {LOCALHOST} from '../config';

export const login = async (loginDetails) => {
    console.log('triggering login')

	return await axios.post(`http://${LOCALHOST}:4000/users/login/`, {
		email: loginDetails.email,
		password: loginDetails.password,
	});
};
