import axios from "axios";
import {FLASKHOST} from '../config';

export const getRecommendedServiceProviders = async () => {
    try {
        const recommendedServiceProviders = await axios.get(`http://${FLASKHOST}/recommender/`)
        return recommendedServiceProviders
    } catch (e) {
        console.log(e)
    }
}