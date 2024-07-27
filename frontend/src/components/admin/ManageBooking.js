import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const bookingList = [
    { id: 1, customerName: 'John Doe', roomNumber: 101, bookingDate: '2024-07-22' },
    { id: 2, customerName: 'Jane Smith', roomNumber: 102, bookingDate: '2024-07-23' },
    { id: 3, customerName: 'Bob Johnson', roomNumber: 103, bookingDate: '2024-07-24' },
];

const ManageBooking = () => {
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Quản lý đặt phòng</h1>
            <div className="list-group">
                {bookingList.map(booking => (
                    <div key={booking.id} className="list-group-item d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h5 className="mb-1">Khách hàng: {booking.customerName}</h5>
                            <p className="mb-1">Phòng: {booking.roomNumber}</p>
                            <p className="mb-1">Ngày đặt: {booking.bookingDate}</p>
                        </div>
                        <div>
                            <button className="btn btn-success me-2">Xác nhận</button>
                            <button className="btn btn-danger">Hủy</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageBooking;
