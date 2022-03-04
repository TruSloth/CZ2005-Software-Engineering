import {TOGGLE_LOGGED_IN, REGISTRATION_SUCCESS, REGISTRATION_FAILURE, VERIFICATION_SUCCESS, VERIFICATION_FAILURE} from './constants';
import axios from 'axios';

export const toggleLogIn = (loggedIn) => {
	return {
		type: TOGGLE_LOGGED_IN,
		payload: loggedIn,
	};
};

export const register = (registrationDetails) => {
	return async (dispatch) => {
		let response;

		try {
			response = await axios.post(
				'http://192.168.1.84:4000/users/register/',
				{
					userName: registrationDetails.userName,
					email: registrationDetails.email,
					password: registrationDetails.password,
					confirmationPassword: registrationDetails.password,
				}
			);
		} catch (e) {
            console.log(e)
			dispatch(registrationFailure())
            return
		}

		if (response.status == 200) {
            dispatch(registrationSuccess(response.data.userName))
        }
	};
};

export const verify = (verificationCode) => {
    return async (dispatch, getState) => {
        let response;

        const state = getState()


        console.log(`http://192.168.1.84:4000/users/${state.auth.tempRegisteredUser}/`)

        try {
            response = await axios.post(
                `http://192.168.1.84:4000/users/register/${state.auth.tempRegisteredUser}/`, {
                    authid: verificationCode,
                }
            );
        } catch (e) {
            console.log(e)
            dispatch(verificationFailure())
            return
        }

        if (response.status == 200) {
            dispatch(verificationSuccess())
        }
    }
}

const registrationSuccess = (registeredUserName) => {
	return {type: REGISTRATION_SUCCESS, payload: registeredUserName};
};

const registrationFailure = () => {
    return {
        type: REGISTRATION_FAILURE, payload: ''
    }
}

const verificationSuccess = () => {
    return {type: VERIFICATION_SUCCESS, payload: true}
}

const verificationFailure = () => {
    return {type: VERIFICATION_FAILURE, payload: false}
}
