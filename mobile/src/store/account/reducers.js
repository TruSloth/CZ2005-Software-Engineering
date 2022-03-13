import {
	SET_CURRENT_USER,
} from './constants';

const initialState = {
	userName: null,
};

const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
            console.log('updating account')
			return {
				...state,
				userName: action.payload,
			}

		default:
			return state;
	}
};

export default accountReducer;
