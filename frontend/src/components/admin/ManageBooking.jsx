import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAllBooking, manageStateBooking } from '../../services/BookingAPI';
import { Modal, Button } from 'react-bootstrap';
import { BookingActionTranslation, BookingStatusTranslation } from '../../translations/BookingTranslations';

const ManageBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');

    useEffect(() => {
        const getBookingList = async () => {
            const bookingList = await fetchAllBooking();
            setBookings(bookingList);
        };
        getBookingList();
    }, []);

    const handleShowModal = (booking, type) => {
        setSelectedBooking(booking);
        setActionType(type);
        setShowModal(true);
    };

    const handleConfirm = async () => {
        let newStatus = actionType.replace("ACTION_", "")
        await manageStateBooking(selectedBooking.id, newStatus);
        setBookings(prevBookings => 
            prevBookings.map(booking =>
                booking.id === selectedBooking.id ? { ...booking, status: newStatus } : booking)
        );
        
        setShowModal(false);
    };

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Quản lý đặt phòng</h1>
            <div className="list-group">
                {bookings.map(booking => (
                    <div key={booking.id} className="list-group-item d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h5 className="mb-1">Khách hàng: {booking.customerName}</h5>
                            <p className="mb-1">Phòng: {booking.roomNumber}</p>
                            <p className="mb-1">Ngày đặt: {booking.bookingDate}</p>
                            <p className="mb-1">Trạng thái: {BookingStatusTranslation[booking.status]}</p>
                        </div>
                        <div>
                            {booking.status === 'DRAFT' ? (
                                <>
                                    <button 
                                        className="btn btn-success me-2" 
                                        onClick={() => handleShowModal(booking, 'ACTION_APPROVE')}>
                                        Duyệt
                                    </button>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => handleShowModal(booking, 'ACTION_REFUSE')}>
                                        Từ chối
                                    </button>
                                </>
                            ) : <>
                                {booking.status === 'APPROVE' && 
                                <button 
                                    className="btn btn-success me-2" 
                                    onClick={() => handleShowModal(booking, 'ACTION_DONE')}>
                                    Hoàn thành
                                </button>
                                }
                                {booking.status !== 'CANCEL' && booking.status !== 'DONE' &&
                                <button 
                                    className="btn btn-secondary me-2" 
                                    onClick={() => handleShowModal(booking, 'ACTION_DRAFT')}>
                                    Đưa về nháp
                                </button>
                                }
                                </>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal xác nhận */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn {BookingActionTranslation[actionType]} đơn đặt phòng này không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleConfirm}>
                        Xác nhận
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageBooking;
