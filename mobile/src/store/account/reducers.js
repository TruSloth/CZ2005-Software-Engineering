import {
	SET_CURRENT_USER,
	TOGGLE_LOGGED_IN,
	UPDATE_CURRENT_QUEUE,
	NOT_IN_QUEUE,
	ERROR,
	UPDATE_AVATAR_IMAGE,
	UPDATE_AVATAR_IMAGE_URL
} from './constants';

const initialState = {
	isLoggedIn: false,
	userName: null,
	accountType: null,
	profilePic: null,
	currentQueueName: null,
	currentQueueID: null,
	queueStatus: NOT_IN_QUEUE,
	serviceProviderID: null,
	points: 0,
	avatarImage: require('../../assets/defaultProfilePic.png'),
	avatarImageURL: null,
};

const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				userName: action.payload.userName,
				accountType: action.payload.accountType,
				serviceProviderID: action.payload.serviceProviderID,
				avatarImageURL: action.payload.avatarImageURL
			}
		case TOGGLE_LOGGED_IN:
			return {
				...state,
				isLoggedIn: action.payload,
			};
		case UPDATE_CURRENT_QUEUE:
			return {
				...state,
				currentQueueName: action.payload.venueName,
				currentQueueID: action.payload.venueID,
				queueStatus: action.payload.queueStatus
			}
		case UPDATE_AVATAR_IMAGE:
			return {
				...state,
				avatarImage: action.payload
			}
		case ERROR:
			return {
				...state
			}
		default:
			return state;
	}
};

export default accountReducer;
