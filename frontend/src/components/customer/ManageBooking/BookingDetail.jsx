import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Để lấy query parameters
import { fetchBookingById, cancelBooking } from '../../../services/BookingAPI';
import { Button } from 'react-bootstrap';
import { BookingStatusTranslation } from '../../../translations/BookingTranslations';
import './../../../assets/styles/customer/BookingDetail.css'

const BookingDetail = () => {
    const [booking, setBooking] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id'); // Lấy ID từ query parameters
        const getBooking = async () => {
            const bookingDetail = await fetchBookingById(id); // Gọi API để lấy thông tin chi tiết
            setBooking(bookingDetail);
        };
        getBooking();
    }, [location.search]);

    const handleCancelBooking = async () => {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id'); // Lấy ID từ query parameters
        await cancelBooking(id);
        setBooking({
            ...booking,
            status: 'CANCEL'
        })
    };

    if (!booking) return <div>Loading...</div>;

    return (
        <div className="booking-detail-container">
            <h2>Chi tiết đơn đặt phòng</h2>
            <div className="booking-detail">
                <h4>Số phòng: {booking.roomNumber}</h4>
                <p><strong>Tên khách hàng:</strong> {booking.customerName}</p>
                <p><strong>Ngày đặt:</strong> {booking.bookingDate}</p>
                <p><strong>Ngày check-in:</strong> {booking.checkInDate}</p>
                <p><strong>Ngày check-out:</strong> {booking.checkOutDate}</p>
                <p><strong>Trạng thái:</strong> {BookingStatusTranslation[booking.status]}</p>
                {booking.status === 'DRAFT' &&
                    <Button className='btn btn-danger' variant="secondary" onClick={handleCancelBooking}>
                        Hủy đặt phòng
                    </Button>}
            </div>
        </div>
    );
};

export default BookingDetail;
