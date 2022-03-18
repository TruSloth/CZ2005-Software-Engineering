import {
	SET_CURRENT_USER,
} from './constants';

export const setCurrentUser = (userName) => {
	return {
		type: SET_CURRENT_USER,
		payload: userName,
	};
};
