import React from 'react';

const rooms = [
    { id: 1, roomNumber: 101, type: 'Deluxe', price: 100, status: 'Available' },
    { id: 2, roomNumber: 102, type: 'Standard', price: 80, status: 'Available' },
    { id: 3, roomNumber: 103, type: 'Suite', price: 150, status: 'Booked' },
];

const ManageRoom = () => {
    return (
        <div>
            <h1>Quản lý phòng khách sạn</h1>
            <button>Thêm phòng mới</button>
            <div className="room-list">
                {rooms.map(room => (
                    <div key={room.id}>
                        <h2>Phòng {room.roomNumber}</h2>
                        <p>Loại: {room.type}</p>
                        <p>Giá: ${room.price}</p>
                        <p>Trạng thái: {room.status}</p>
                        <button>Sửa</button>
                        <button>Xóa</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageRoom;
