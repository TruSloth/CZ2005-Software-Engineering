import {
	TOGGLE_LOGGED_IN,
} from './constants';

const initialState = {
	isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_LOGGED_IN:
			return {
				...state,
				isLoggedIn: true,
			}

		default:
			return state;
	}
};

export default authReducer;
