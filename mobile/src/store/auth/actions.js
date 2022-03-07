import {
	TOGGLE_LOGGED_IN,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	REGISTRATION_SUCCESS,
	REGISTRATION_FAILURE,
	REGISTRATION_REQUEST,
	VERIFICATION_SUCCESS,
	VERIFICATION_FAILURE,
} from './constants';

import axios from 'axios';

import {LOCALHOST} from '../../services/config';

export const toggleLogIn = (loggedIn) => {
	return {
		type: TOGGLE_LOGGED_IN,
		payload: loggedIn,
	};
};

export const login = (loginDetails) => {
	return async (dispatch) => {
		let response;

		dispatch(loginRequest());

		try {
			response = await axios.post(
				`http://${LOCALHOST}:4000/users/login/`,
				{
					email: loginDetails.email,
					password: loginDetails.password,
				}
			);

			if (response.status == 200) {
				dispatch(loginSuccess());
			}
		} catch (e) {
			dispatch(loginFailure());
			return;
		}
	};
};

export const register = (registrationDetails) => {
	return async (dispatch) => {
		dispatch(registrationRequest());

		let response;

		try {
			response = await axios.post(
				`http://${LOCALHOST}:4000/users/register/`,
				{
					userName: registrationDetails.userName,
					email: registrationDetails.email,
					password: registrationDetails.password,
					confirmationPassword: registrationDetails.password,
				}
			);
		} catch (e) {
			console.log(e)
			dispatch(registrationFailure());
		}

		dispatch(registrationSuccess(response.data.userName));
	}

};

export const verify = (verificationCode) => {
	return async (dispatch, getState) => {
		let response;

		const state = getState();

		console.log(
			`http://${LOCALHOST}:4000/users/${state.auth.tempRegisteredUser}/`
		);

		try {
			response = await axios.post(
				`http://${LOCALHOST}:4000/users/register/${state.auth.tempRegisteredUser}/`,
				{
					authid: verificationCode,
				}
			);

		} catch (e) {
			console.log(e);
			dispatch(verificationFailure());
			return;
		}

		if (response.status == 200) {
			console.log('success');
			dispatch(verificationSuccess());
		}
	};
};

const registrationRequest = () => {
	return {
		type: REGISTRATION_REQUEST,
	};
};

const registrationSuccess = (registeredUserName) => {
	return {type: REGISTRATION_SUCCESS, payload: registeredUserName};
};

const registrationFailure = () => {
	return {
		type: REGISTRATION_FAILURE,
		payload: '',
	};
};

const loginRequest = () => {
	return {
		type: LOGIN_REQUEST,
	};
};

const loginSuccess = () => {
	return {type: LOGIN_SUCCESS};
};

const loginFailure = () => {
	return {
		type: LOGIN_FAILURE,
	};
};

const verificationSuccess = () => {
	return {type: VERIFICATION_SUCCESS, payload: true};
};

const verificationFailure = () => {
	return {type: VERIFICATION_FAILURE, payload: false};
};
