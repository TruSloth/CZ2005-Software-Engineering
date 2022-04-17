import axios from "axios";
import {FLASKHOST} from '../config';

/**
 * @memberof serviceProviders
 * @function getRecommendedServiceProviders
 * @async
 * @param {String} userName The username of the user to get recommendations for
 * @returns {response}
 */
export const getRecommendedServiceProviders = async (userName) => {
    try {
        const recommendedServiceProviders = await axios.get(`http://${FLASKHOST}/recommender/`, {
            params: {
                user: userName
            }
        })
        return recommendedServiceProviders
    } catch (e) {
        console.log(e)
    }
}