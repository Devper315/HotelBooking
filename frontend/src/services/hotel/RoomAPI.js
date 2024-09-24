import axios from 'axios';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { firebaseApp } from '../../firebase';
import { createConfig } from '../helper/jwtHelper';

export const API_BASE_URL = 'http://localhost:8080/api'

export const fetchRooms = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/room/all`,
            {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            }
        );
        let roomData = response.data.result;
        let roomList = roomData.map(room => ({
            id: room.id,
            roomNumber: room.roomNumber,
            type: room.type.name,
            price: room.price,
            status: room.status,
            imagePath: room.imagePath
        }))
        return roomList;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw error;
    }
};

export const uploadImage = async (obj, type) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    try {
        const formData = new FormData();
        formData.append('id', obj.id);
        formData.append('file', obj.imageFile);
        formData.append('fileName', type + obj.id);
        let url;
        if (type === 'room')
            url = `${API_BASE_URL}/admin/${type}/upload-image`
        if (type === 'profile')
            url = `${API_BASE_URL}/${type}/upload-image`

        const response = await axios.post(url, formData, config);
        return response.data.result;
    } catch (error) {
        console.error('Lỗi upload ảnh:', error);
        throw error;
    }
}

// Lấy url firebase của ảnh sau khi upload
export const fetchImageURL = async (imagePath) => {
    try {
        const storage = getStorage(firebaseApp);
        const imageRef = ref(storage, imagePath);
        const url = await getDownloadURL(imageRef);
        return url
    } catch (error) {
        console.error('Lỗi khi lấy token ảnh:', error);
    }
};

export const createRoom = async (room) => {
    const config = createConfig()
    const body = {
        roomNumber: room.roomNumber,
        roomType: room.type,
        price: room.price,
        status: room.status
    };
    try {
        const response = await axios.post(`${API_BASE_URL}/admin/room`,
            body,
            config
        );
        const newRoom = response.data.result;
        return {
            ...newRoom,
            'type': newRoom.type.name,
        }
    } catch (error) {
        console.error('Lỗi tạo phòng:', error);
    }
};

export const updateRoom = async (room) => {
    const config = createConfig()
    config.params = {
        id: room.id
    }
    const body = {
        type: room.type,
        price: room.price,
        status: room.status
    };
    try {
        const response = await axios.put(`${API_BASE_URL}/admin/room`,
            body,
            config
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi sửa phòng:', error);
    }
};

export const deleteRoom = async (room) => {
    const config = createConfig()
    config.params = {
        id: room.id
    }
    try {
        const response = await axios.delete(`${API_BASE_URL}/admin/room`, config);
        return response.data.result;
    } catch (error) {
        console.error('Lỗi xóa phòng:', error);
    }
};
