import {

} from './constants';

const initialState = {
	nearbyVenues: [],
    pastVenues: [],
    last_lat: null,
    last_lng: null,
};

const serviceProvidersReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_LOGGED_IN:
			return {
				...state,
				isLoggedIn: action.payload,
			}

		default:
			return state;
	}
};

export default serviceProvidersReducer;
