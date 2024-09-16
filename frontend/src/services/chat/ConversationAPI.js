import axios from "axios";
import { createConfig } from "../helper/jwtHelper";
import { API_BASE_URL } from "../hotel/RoomAPI";

export const fetchMyConversation = async (userId2) => {
    try {
        const config = createConfig()
        config.params = {
            userId2
        }
        const response = await axios.get(`${API_BASE_URL}/chat/conversation`, config);
        return response.data.result;
    } catch (error) {
        console.error('Lỗi lấy dữ liệu trò chuyện:', error);
    }
}

