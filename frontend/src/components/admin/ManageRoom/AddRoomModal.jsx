import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AddRoomModal = ({ show, onHide, room, onFieldChange, onImageChange, onSaveClick, previewImage }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm phòng mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="roomNumber">Số phòng</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        name="roomNumber"
                        id="roomNumber"
                        value={room.roomNumber}
                        onChange={onFieldChange}
                        placeholder="Nhập số phòng"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="type">Loại phòng</label>
                    <select
                        className="form-control mb-2"
                        name="type"
                        id="type"
                        value={room.type}
                        onChange={onFieldChange}>
                        <option value="Standard">Thường</option>
                        <option value="Deluxe">Sang trọng</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Giá phòng</label>
                    <input
                        type="number"
                        className="form-control mb-2"
                        name="price"
                        id="price"
                        value={room.price}
                        onChange={onFieldChange}
                        placeholder="Nhập giá phòng"/>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Trạng thái</label>
                    <input
                        className="form-control mb-2"
                        name="status"
                        id="status"
                        value="Trống" readOnly/>
                </div>
                <div className="form-group">
                    <label htmlFor="imageUpload">Tải ảnh</label>
                    <input
                        type="file"
                        className="form-control mb-2"
                        id="imageUpload"
                        onChange={onImageChange}/>
                </div>
                {previewImage && (
                    <img src={previewImage} alt="Preview" className="img-thumbnail mb-2" />
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onSaveClick}>Lưu</Button>
                <Button variant="secondary" onClick={onHide}>Hủy</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddRoomModal;
