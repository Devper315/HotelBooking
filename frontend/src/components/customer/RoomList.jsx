import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import { fetchRooms } from '../../services/hotel/RoomAPI';
import { ms } from 'date-fns/locale';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorAPI, setErrorAPI] = useState(null)
    // Gọi API lấy dữ liệu phòng
    useEffect(() => {
        const getRooms = async () => {
            try {
                const rooms = await fetchRooms();
                setRooms(rooms);
            } catch (error) {
                let msg = 'Lỗi khi lấy dữ liệu phòng:' + error.message
                console.error('Lỗi khi lấy dữ liệu phòng:', error);
                setErrorAPI(msg)
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
            <div>{errorAPI}</div>
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
