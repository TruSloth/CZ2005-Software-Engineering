import {
    LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REGISTRATION_REQUEST,
	REGISTRATION_SUCCESS,
	REGISTRATION_FAILURE,
	VERIFICATION_SUCCESS,
	VERIFICATION_FAILURE,
} from './constants';

const initialState = {
	isLoggedIn: false,
	success: false,
	tempRegisteredUser: '',
	loading: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
                loading: true,
                success: false,
				isLoggedIn: false,
			};

        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                isLoggedIn: true,
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                isLoggedIn: false,
            };

		case REGISTRATION_REQUEST:
			return {
				...state,
				success: false,
				loading: true,
                tempRegisteredUser: '',
			};

		case REGISTRATION_SUCCESS:
			console.log('registration success')
			console.log('payload is ' + action.payload)
			return {
				...state,
				success: true,
				loading: false,
				tempRegisteredUser: action.payload,
			};

		case REGISTRATION_FAILURE:
			return {
				...state,
				success: false,
				loading: false,
				tempRegisteredUser: action.payload,
			};

		case VERIFICATION_SUCCESS:
			return {
				...state,
				isLoggedIn: action.payload,
			};

		case VERIFICATION_FAILURE:
			return {
				...state,
				isLoggedIn: action.payload,
			};

		default:
			return state;
	}
};

export default authReducer;
