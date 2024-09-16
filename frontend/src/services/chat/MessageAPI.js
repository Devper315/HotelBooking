import axios from "axios";
import { createConfig } from "../helper/jwtHelper";
import { API_BASE_URL } from "../hotel/RoomAPI";

export const fetchMessageByConversationId = async (conversationId) => {
    try {
        const config = createConfig()
        config.params = {
            conversationId
        }
        const response = await axios.get(`${API_BASE_URL}/chat/message`, config);
        return response.data.result;
    } catch (error) {
        console.error('Lỗi lấy dữ liệu tin nhắn:', error);
    }
}