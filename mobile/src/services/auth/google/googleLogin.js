import axios from 'axios';

import {LOCALHOST} from '../../config';

export const googleLogin = async (userInfo) => {
	return axios.post(`http://${LOCALHOST}:80/users/login/google`, {
		idToken: userInfo.idToken,
		accountType: userInfo.user.accountType,
	});
};
