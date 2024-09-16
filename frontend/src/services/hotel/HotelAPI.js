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