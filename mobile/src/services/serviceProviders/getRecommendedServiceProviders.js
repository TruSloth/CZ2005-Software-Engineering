import axios from "axios";
import {FLASKHOST} from '../config';

export const getRecommendedServiceProviders = async (userName) => {
    console.log('fetching data')
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