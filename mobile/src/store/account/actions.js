import {
	SET_CURRENT_USER,
	TOGGLE_LOGGED_IN,
	UPDATE_CURRENT_QUEUE,
	NOT_IN_QUEUE,
	QUEUING,
	QUEUE_REACHED,
	IN_STORE,
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

export const updateCurrentQueue = (
	serviceProviderName,
	serviceProviderID,
	queueStatus
) => {
	if (!queueStatus in [NOT_IN_QUEUE, QUEUING, QUEUE_REACHED, IN_STORE]) {
		console.log('Error updating queue. Unknown Queue status.');

		return {
			type: ERROR,
		};
	}

	return {
		type: UPDATE_CURRENT_QUEUE,
		payload: {
			venueName: serviceProviderName,
			venueID: serviceProviderID,
			queueStatus: queueStatus,
		},
	};
};
