import {
	SET_CURRENT_USER,
	TOGGLE_LOGGED_IN,
} from './constants';

const initialState = {
	isLoggedIn: false,
	userName: null,
	profilePic: null,
	points: 0,
};

const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
            console.log('updating account')
			return {
				...state,
				userName: action.payload,
			}
		case TOGGLE_LOGGED_IN:
			return {
				...state,
				isLoggedIn: action.payload,
			}
		default:
			return state;
	}
};

export default accountReducer;
