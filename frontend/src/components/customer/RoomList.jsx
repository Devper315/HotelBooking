import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import { fetchRooms } from '../../services/RoomAPI';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Gọi API lấy dữ liệu phòng
    useEffect(() => {
        const getRooms = async () => {
            try {
                const rooms = await fetchRooms();
                setRooms(rooms);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu phòng:', error);
                setRooms([]);
            } finally {
                setIsLoading(false);
            }
        };

        getRooms();
    }, []);



    return (
        <div className="container mt-4">
            <h1 className="mb-4">Danh sách phòng khách sạn</h1>
            {isLoading && <div className="loading-spinner">Đang xử lý</div>}
            <div className="row">
                {rooms.map(room => (
                    <div key={room.id} className="col-md-4 mb-4">
                        <RoomCard room={room}/>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default RoomList;
