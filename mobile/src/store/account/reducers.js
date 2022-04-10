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
	currentQueue: null,
	points: 0,
};

const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				userName: action.payload.userName,
				accountType: action.payload.accountType,
			};
		case TOGGLE_LOGGED_IN:
			return {
				...state,
				isLoggedIn: action.payload,
			};
		case UPDATE_CURRENT_QUEUE:
			return {
				...state,
				currentQueue: action.payload,
			};
		default:
			return state;
	}
};

export default accountReducer;
