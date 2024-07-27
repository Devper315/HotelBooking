import React from "react";

const room = {
    id: 1,
    roomNumber: 101,
    type: 'Deluxe',
    price: 100,
    status: 'Available',
    description: 'Phòng đẹp, tiện nghi với tầm nhìn ra biển.',
    imageUrl: 'https://via.placeholder.com/150' 
}

const RoomDetail = () => {
    return (
        <div>
            <h1>Chi tiết phòng {room.roomNumber}</h1>
            <img src={room.imageUrl} alt={`Phòng ${room.roomNumber}`} />
            <p>Loại: {room.type}</p>
            <p>Giá: ${room.price}</p>
            <p>Trạng thái: {room.status}</p>
            <p>Mô tả: {room.description}</p>
            <button>Đặt phòng</button>
        </div>
    )
}

export default RoomDetail;