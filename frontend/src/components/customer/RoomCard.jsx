import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { fetchImageURL } from '../../services/hotel/RoomAPI';
import BookingModal from './BookingModal'; // Import component mới
import './../../assets/styles/customer/RoomCard.css';
import { useNavigate } from 'react-router-dom';
import { RoomStatusTranslations } from '../../translations/RoomTranslations';

const RoomCard = ({ room }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [showModal, setShowModal] = useState(false); // State để kiểm soát modal đặt phòng
    const [showLoginAlert, setShowLoginAlert] = useState(false); // State để kiểm soát modal thông báo đăng nhập
    const navigate = useNavigate();

    useEffect(() => {
        const getImageUrl = async () => {
            try {
                const url = await fetchImageURL(room.imagePath);
                room.imageUrl = url;
                setImageUrl(url);
            } catch (error) {
                console.error('Lỗi khi lấy url ảnh:', error);
                setImageUrl('');
            }
        };
        getImageUrl();
    }, [room]);

    const handleBookRoomClick = () => {
        const token = localStorage.getItem('token'); // Kiểm tra token trong localStorage
        if (token) {
            setShowModal(true); // Hiện modal đặt phòng nếu có token
        } else {
            setShowLoginAlert(true); // Hiện modal thông báo yêu cầu đăng nhập nếu không có token
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleLoginRedirect = () => {
        setShowLoginAlert(false);
        navigate('/login'); // Chuyển hướng đến trang đăng nhập
    };

    const handleCloseLoginAlert = () => {
        setShowLoginAlert(false);
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Phòng {room.roomNumber}</h2>
                <p className="card-text">Loại: {room.type}</p>
                <p className="card-text">Giá: ${room.price}</p>
                <p className="card-text">Trạng thái: {RoomStatusTranslations[room.status]}</p>
                <img src={imageUrl} alt="Room" className="img-thumbnail room-card-img mb-2" />
                {room.status === 'AVAILABLE' &&<Button variant="info" onClick={handleBookRoomClick}>Đặt phòng</Button>}
            </div>

            {/* Modal Đặt phòng */}
            <BookingModal
                show={showModal}
                onHide={handleModalClose}
                room={room}
            />

            {/* Modal Thông báo đăng nhập */}
            <Modal show={showLoginAlert} onHide={handleCloseLoginAlert}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn cần đăng nhập để đặt phòng!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleLoginRedirect}>
                        Đăng nhập
                    </Button>
                    <Button variant="secondary" onClick={handleCloseLoginAlert}>
                        Quay lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RoomCard;
