import {LOCALHOST} from '../../services/config';
import {io} from 'socket.io-client';

const socket = io(`ws://${LOCALHOST}:80/`, {
	autoConnect: false,
});

const initialState = {
	socket: socket,
};

const socketReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default socketReducer;
