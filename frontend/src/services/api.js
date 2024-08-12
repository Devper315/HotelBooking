import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8080/api/hotel';

export const fetchRooms = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/room/all`);
        let roomData = response.data.result;
        let roomList = roomData.map(room => ({
            id: room.id,
            roomNumber: room.roomNumber,
            type: room.type.typeName, 
            price: room.price, 
            status: room.status,
            imageUrl: room.imageUrl 
        }))
        return roomList;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw error;
    }
};