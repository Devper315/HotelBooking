import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Để điều hướng đến trang chi tiết
import { fetchMyBooking } from '../../../services/BookingAPI';
import './../../../assets/styles/customer/MyBooking.css'
import { BookingStatusTranslation } from '../../../translations/BookingTranslations';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const getBookings = async () => {
            const bookingList = await fetchMyBooking();
            setBookings(bookingList);
        };
        getBookings();
    }, []);

    return (
        <div className="room-list-container">
            <h2 className="room-list-header">Danh sách đặt phòng</h2>
            <div className="room-list">
                <ul className="list-group">
                    {bookings.map((booking) => (
                        <li key={booking.id} className="list-group-item">
                            <span>Số phòng: {booking.roomNumber}</span>
                            <span>Ngày đặt: {booking.bookingDate}</span>
                            <span>Trạng thái: {BookingStatusTranslation[booking.status]}</span>
                            <Link to={`/customer/booking-detail?id=${booking.id}`}>
                                <Button variant="info">
                                    Xem chi tiết
                                </Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BookingList;
