import axios from 'axios';

import {LOCALHOST} from '../../config';

export const googleRegister = async (userInfo) => {
	return axios.post(`http://${LOCALHOST}:80/users/register/google`, {
		idToken: userInfo.idToken,
		accountType: userInfo.user.accountType,
	});
};
