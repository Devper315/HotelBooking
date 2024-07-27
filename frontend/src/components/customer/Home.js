import React from "react";

const roomList = [
    { id: 1, roomNumber: 101, type: 'Deluxe', price: 100, status: 'Available' },
    { id: 2, roomNumber: 102, type: 'Standard', price: 80, status: 'Available' },
    { id: 3, roomNumber: 103, type: 'Suite', price: 150, status: 'Booked' },
]

const Home = () => {
    return (
        <div>
            <h1>Danh sách phòng khách sạn</h1>
            <div className="room-list">
                {roomList.map(room => (
                    <div key={room.id}>
                        <h2>Phòng {room.roomNumber}</h2>
                        <p>Loại: {room.type}</p>
                        <p>Giá: {room.price}</p>
                        <p>Trạng thái: {room.status}</p>
                        <button>Chi tiết</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;