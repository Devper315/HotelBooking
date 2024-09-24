import axios from "axios";
import { API_BASE_URL } from "./RoomAPI";
import { createConfig } from "../helper/jwtHelper";

export const fetchAllHotel = async () => {
    try{
        const config = createConfig()
        const response = await axios.get(`${API_BASE_URL}/admin/hotel/all`, config)
        return response.data.result
    }
    catch(error){
        console.log("Lỗi lấy dữ liệu khách sạn: ", error);
    }
}

export const createHotel = async (hotel) => {
    const config = createConfig()
    hotel.wardId = hotel.ward.split("-")[0]
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/hotel`, hotel, config);
        return response.data.result;
    } catch (error) {
        console.error('Lỗi tạo khách sạn:', error);
    }
};