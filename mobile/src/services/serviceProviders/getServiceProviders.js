import axios from 'axios';
import {LOCALHOST} from '../config';

export const getServiceProviders = async (hour) => {
	try {
		const serviceProviders = await axios.get(
			`http://${LOCALHOST}/serviceProvider/get-stall`,
			{
				params: {
					hour: hour,
				},
			}
		);
		return serviceProviders;
	} catch (e) {
		console.log(e);
	}
};
