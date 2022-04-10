import {
	SET_CURRENT_USER,
	TOGGLE_LOGGED_IN,
	UPDATE_CURRENT_QUEUE
} from './constants';


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

export const updateCurrentQueue = (serviceProviderName, serviceProviderID) => {
	return {
		type: UPDATE_CURRENT_QUEUE,
		payload: {venueName: serviceProviderName, venueID: serviceProviderID}
	}
}

