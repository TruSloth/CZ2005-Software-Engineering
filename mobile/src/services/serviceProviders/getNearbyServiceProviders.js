import axios from 'axios';
import GetLocation from 'react-native-get-location';

import {LOCALHOST} from '../config';

export const getNearbyServiceProviders = async (hour) => {
        try {
                const currentLocation = await GetLocation.getCurrentPosition(
                        {
                                enableHighAccuracy: true,
                                timeout: 15000,
                        }
                )
                const nearbyVenues = await axios.get(`http://${LOCALHOST}/serviceProvider/find-nearest`, 
                        { 
                                params: {
                                        currentLat: currentLocation.latitude,
                                        currentLng: currentLocation.longitude,
                                        hour: hour
                                }     
                        }
                )
                return nearbyVenues
        } catch (e) {
                console.log(e)
        }
};
