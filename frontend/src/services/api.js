import axios from 'axios';
import { getStorage, getDownloadURL, ref } from 'firebase/storage';
import { firebaseApp } from '../firebase';

export const API_BASE_URL = 'http://localhost:8080/api/hotel';

export const fetchRooms = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/room/all`);
        let roomData = response.data.result;
        let roomList = roomData.map(room => ({
            id: room.id,
            roomNumber: room.roomNumber,
            type: room.type.name, 
            price: room.price, 
            status: room.status,
            imagePath: room.imagePath 
        }))
        console.log(roomList)
        return roomList;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw error;
    }
};

export const uploadImage = async (obj, type) => {
    try {
        const formData = new FormData();
        formData.append('file', obj.imageFile);
        formData.append('id', obj.id);
        formData.append('fileName', type + obj.id);
        const response = await axios.post(`${API_BASE_URL}/admin/${type}/upload-image`, formData);
        const imagePath = response.data.result;
        console.log('imagePath: ' + imagePath);
        
        return imagePath;
    } catch (error) {
        console.error('There was an error uploading the file:', error);
        throw error;  // Rethrow the error so that it can be handled by the caller
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

  
export const updateRoom = async (room) => {
    const headers = {
        'Content-Type': 'application/json'
    };
    const body = {
        type: room.type,
        price: room.price,
        status: room.status
    };
    try {
        const response = await axios.put(`${API_BASE_URL}/admin/room`, 
            body, 
            {
                headers,
                params: {
                    id: room.id
                }
            }
        );
        console.log('Room updated successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating room:', error);
    }
};
