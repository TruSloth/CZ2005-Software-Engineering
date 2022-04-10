import axios from "axios";
import {LOCALHOST} from '../config';

export const getServiceProviders = async () => {
    try {
        const serviceProviders = await axios.get(`http://${LOCALHOST}/serviceProvider/get-stall`)
        return serviceProviders
    } catch (e) {
        console.log(e)
    }
}
