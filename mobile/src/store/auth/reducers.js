import { REGISTRATION_FAILURE, REGISTRATION_SUCCESS, TOGGLE_LOGGED_IN, VERIFICATION_SUCCESS, VERIFICATION_FAILURE } from "./constants";

const initialState = {
    isLoggedIn: false,
    registered: false,
    tempRegisteredUser: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.payload
            }

        case REGISTRATION_SUCCESS:
            return {
                ...state,
                registered: true,
                tempRegisteredUser: action.payload
            }

        case REGISTRATION_FAILURE:
            return {
                ...state,
                registered: false,
                tempRegisteredUser: action.payload
            }
        
        case VERIFICATION_SUCCESS:
            return {
                ...state,
                isLoggedIn: action.payload
            }
        
        case VERIFICATION_FAILURE:
            return {
                ...state,
                isLoggedIn: action.payload
            }

        default:
            return state
    }
}

export default authReducer