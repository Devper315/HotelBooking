import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { fetchRooms } from '../../services/api';


const initialRooms = [
    { id: 1, roomNumber: 101, type: 'Deluxe', price: 100, status: 'Available' },
    { id: 2, roomNumber: 102, type: 'Standard', price: 80, status: 'Available' },
    { id: 3, roomNumber: 103, type: 'Suite', price: 150, status: 'Booked' },
];

const ManageRoom = () => {
    const [rooms, setRooms] = useState(initialRooms);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingRoom, setEditingRoom] = useState(null);
    const [editedRoom, setEditedRoom] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [newRoom, setNewRoom] = useState({
        roomNumber: '',
        type: '',
        price: '',
        status: 'Available',
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [roomToDelete, setRoomToDelete] = useState(null);

    useEffect(() => {
        const getRooms = async () => {
            try {
                const data = await fetchRooms();
                setRooms(data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        getRooms();
    }, []);

    const handleEditClick = (room) => {
        setEditingRoom(room.id);
        setEditedRoom({ ...room });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (isAdding) {
            setNewRoom({
                ...newRoom,
                [name]: value,
            });
        } else {
            setEditedRoom({
                ...editedRoom,
                [name]: value,
            });
        }
    };

    const handleSaveClick = () => {
        setRooms(rooms.map(room => (room.id === editedRoom.id ? editedRoom : room)));
        setEditingRoom(null);
    };

    const handleAddClick = () => {
        setIsAdding(true);
    };

    const handleAddSaveClick = () => {
        setRooms([...rooms, { id: rooms.length + 1, ...newRoom, price: parseFloat(newRoom.price) }]);
        setIsAdding(false);
        setNewRoom({
            roomNumber: '',
            type: '',
            price: '',
            status: 'Available',
        });
    };

    const handleDeleteClick = (room) => {
        setRoomToDelete(room);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        setRooms(rooms.filter(room => room.id !== roomToDelete.id));
        setShowDeleteModal(false);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Quản lý phòng khách sạn</h1>
            <button className="btn btn-primary mb-4" onClick={handleAddClick}>Thêm phòng mới</button>
            <div className="row">
                {rooms.map(room => (
                    <div key={room.id} className="col-md-4 mb-4">
                        {editingRoom === room.id ? (
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Phòng {room.roomNumber}</h2>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="type"
                                        value={editedRoom.type}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="number"
                                        className="form-control mb-2"
                                        name="price"
                                        value={editedRoom.price}
                                        onChange={handleInputChange}
                                    />
                                    <select
                                        className="form-control mb-2"
                                        name="status"
                                        value={editedRoom.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Booked">Booked</option>
                                    </select>
                                    <button className="btn btn-success me-2" onClick={handleSaveClick}>Lưu</button>
                                    <button className="btn btn-secondary" onClick={() => setEditingRoom(null)}>Hủy</button>
                                </div>
                            </div>
                        ) : (
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Phòng {room.roomNumber}</h2>
                                    <p className="card-text">Loại: {room.type}</p>
                                    <p className="card-text">Giá: ${room.price}</p>
                                    <p className="card-text">Trạng thái: {room.status}</p>
                                    <button className="btn btn-warning me-2" onClick={() => handleEditClick(room)}>Sửa</button>
                                    <button className="btn btn-danger" onClick={() => handleDeleteClick(room)}>Xóa</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Modal thêm phòng mới */}
            <Modal show={isAdding} onHide={() => setIsAdding(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm phòng mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className="form-control mb-2"
                        name="roomNumber"
                        value={newRoom.roomNumber}
                        onChange={handleInputChange}
                        placeholder="Số phòng"
                    />
                    <input
                        type="text"
                        className="form-control mb-2"
                        name="type"
                        value={newRoom.type}
                        onChange={handleInputChange}
                        placeholder="Loại phòng"
                    />
                    <input
                        type="number"
                        className="form-control mb-2"
                        name="price"
                        value={newRoom.price}
                        onChange={handleInputChange}
                        placeholder="Giá phòng"
                    />
                    <select
                        className="form-control mb-2"
                        name="status"
                        value={newRoom.status}
                        onChange={handleInputChange}
                    >
                        <option value="Available">Available</option>
                        <option value="Booked">Booked</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsAdding(false)}>Hủy</Button>
                    <Button variant="primary" onClick={handleAddSaveClick}>Lưu</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal xác nhận xóa */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa phòng này?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleConfirmDelete}>Xóa</Button>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageRoom;
