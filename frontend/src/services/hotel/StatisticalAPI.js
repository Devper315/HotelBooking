import axios from "axios";
import {API_BASE_URL} from './RoomAPI.js'
import { createConfig } from "../helper/jwtHelper.js";

export const fetchRoomStatistical = async () => {
    try {
        const config = createConfig()
        const response = await axios.get(`${API_BASE_URL}/admin/room/statistical`, config);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching room statistical:', error)
    }
};

export const fetchBookingStatistical = async () => {
    
    try {
        const config = createConfig()
        const response = await axios.get(`${API_BASE_URL}/admin/booking/statistical`, config);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching booking statistical:', error);
    }
};