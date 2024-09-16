import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { createBooking } from '../../services/BookingAPI';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RoomBookingModal = ({ show, onHide, room }) => {
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [bookingId, setBookingId] = useState(null);
    const { userInfo } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (show) {
            setIsProcessing(false);
            setIsSuccess(false);
            setError('');
            setCustomerName(userInfo.fullName);
            setCustomerPhone('');
            setCheckInDate('');
            setCheckOutDate('');
            setBookingId(null);
        }
    }, [show, userInfo.fullName]);

    const handleBookingConfirmation = async () => {
        setIsProcessing(true);
        const bookingData = {
            roomId: room.id,
            customerName: customerName,
            phoneNumber: customerPhone,
            checkInDate,
            checkOutDate
        }
        const response = await createBooking(bookingData)
        setBookingId(response.id);
        setIsSuccess(true);
        setIsProcessing(false);
    };

    const handleViewBooking = () => {
        console.log("Redirect to booking Id: " + bookingId);
        navigate(`/customer/booking-detail?id=${bookingId}`)
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Đặt phòng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isProcessing ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p>Vui lòng chờ...</p>
                    </div>
                ) : isSuccess ? (
                    <div className="text-center">
                        <Alert variant="success">
                            Tạo đơn đặt phòng thành công! <br/>
                            Kết quả duyệt đơn sẽ được gửi về email của bạn.
                        </Alert>
                        {/* <Button variant="primary" onClick={handleViewBooking}>
                            Xem đơn đặt phòng
                        </Button> */}
                    </div>
                ) : (
                    <>
                        <img src={room.imageUrl} alt="Room" className="img-thumbnail mb-2" />
                        <h2>Phòng {room.roomNumber}</h2>
                        <p>Loại: {room.type}</p>
                        <p>Giá: ${room.price}</p>

                        <Form>
                            <Form.Group controlId="customerName">
                                <Form.Label>Tên khách hàng</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập họ tên"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="customerPhone">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="Nhập số điện thoại"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formCheckIn">
                                <Form.Label>Ngày check-in</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formCheckOut">
                                <Form.Label>Ngày check-out</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                />
                            </Form.Group>

                            {error && <Alert variant="danger">{error}</Alert>}
                        </Form>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                {!isProcessing && !isSuccess && (
                    <Button variant="primary" onClick={handleBookingConfirmation}>
                        Xác nhận đặt phòng
                    </Button>
                )}
                {!isProcessing && (
                    <Button variant="secondary" onClick={onHide}>
                        Đóng
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default RoomBookingModal;
