import {SET_CURRENT_USER, TOGGLE_LOGGED_IN} from './constants';

export const setCurrentUser = (user) => {
	return {
		type: SET_CURRENT_USER,
		payload: user,
	};
};

export const toggleLogIn = (loggedIn) => {
	return {
		type: TOGGLE_LOGGED_IN,
		payload: loggedIn,
	};
};
