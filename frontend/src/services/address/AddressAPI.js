import axios from "axios";
import { createConfig } from "../helper/jwtHelper";
import { API_BASE_URL } from "../hotel/RoomAPI";

export const fetchAllCity = async () => {
    try {
        const config = createConfig()
        const response = await axios.get(`${API_BASE_URL}/city`, config);
        return response.data.result;
    } catch (error) {
        console.error('Lỗi lấy dữ liệu tỉnh/thành phố:', error);
    }
}

export const fetchDistrictByCityId = async (cityId) => {
    try {
        const config = createConfig()
        config.params = {cityId}
        const response = await axios.get(`${API_BASE_URL}/district`, config);
        return response.data.result;
    } catch (error) {
        console.error('Lỗi lấy dữ liệu quận/huyện:', error);
    }
}

export const fetchWardByDistrictId = async (districtId) => {
    try {
        const config = createConfig()
        config.params = {districtId}
        const response = await axios.get(`${API_BASE_URL}/ward`, config);
        return response.data.result;
    } catch (error) {
        console.error('Lỗi lấy dữ liệu phường/xã:', error);
    }
}