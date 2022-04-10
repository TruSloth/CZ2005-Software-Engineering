import {
	SET_CURRENT_USER,
	TOGGLE_LOGGED_IN,
	UPDATE_CURRENT_QUEUE,
} from './constants';

const initialState = {
	isLoggedIn: false,
	userName: null,
	accountType: null,
	profilePic: null,
	currentQueueName: null,
	currentQueueID: null,
	serviceProviderID: null,
	points: 0,
};

const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				userName: action.payload.userName,
				accountType: action.payload.accountType,
				serviceProviderID: action.payload.serviceProviderID
			}
		case TOGGLE_LOGGED_IN:
			return {
				...state,
				isLoggedIn: action.payload,
			}
		case UPDATE_CURRENT_QUEUE:
			return {
				...state,
				currentQueueName: action.payload.venueName,
				currentQueueID: action.payload.venueID
			}
		default:
			return state;
	}
};

export default accountReducer;
