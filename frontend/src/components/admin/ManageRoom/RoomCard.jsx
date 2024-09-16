import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { fetchImageURL } from '../../../services/RoomAPI';
import './../../../assets/styles/admin/RoomCard.css';
import { RoomStatusTranslations, RoomTypeTranslations } from '../../../translations/RoomTranslations';

const RoomCard = ({ room, editedRoom, onEditClick, onDeleteClick, isEditing,
    onImageChange, previewImage, onFieldChange, onFinishEdit }) => {

    const displayRoom = isEditing ? editedRoom : room;
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        const getImageUrl = async () => {
            const url = await fetchImageURL(room.imagePath);
            setImageUrl(url);
        };
        getImageUrl();
    }, [room]);

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Phòng {displayRoom.roomNumber}</h2>
                {isEditing ? (
                    <>
                        <label htmlFor={`type-${displayRoom.id}`}>Loại phòng</label>
                        <select
                            className="form-control mb-2"
                            name="type"
                            id={`type-${displayRoom.id}`}
                            value={displayRoom.type}
                            onChange={(e) => onFieldChange(e, displayRoom.id)}>
                            <option value="Standard">Thường</option>
                            <option value="Deluxe">Sang trọng</option>
                        </select>
                        <label htmlFor={`price-${displayRoom.id}`}>Giá phòng</label>
                        <input
                            type="number"
                            className="form-control mb-2"
                            id={`price-${displayRoom.id}`}
                            name="price"
                            value={displayRoom.price}
                            onChange={(e) => onFieldChange(e, displayRoom.id)}
                        />
                        <label htmlFor={`image-${displayRoom.id}`}>Hình ảnh</label>
                        <input
                            type="file"
                            className="form-control mb-2"
                            id={`image-${displayRoom.id}`}
                            onChange={(e) => onImageChange(e, displayRoom.id)} />
                        {previewImage && <img src={previewImage} alt="Preview" className="room-card-img img-thumbnail mb-2" />}
                        <Button variant="success" onClick={() => onFinishEdit("save")}>Lưu</Button>
                        <Button variant="secondary" onClick={() => onFinishEdit("cancel")}>Hủy</Button>
                    </>
                ) : (
                    <>
                        <p className="card-text">Loại: {RoomTypeTranslations[displayRoom.type]}</p>
                        <p className="card-text">Giá: ${displayRoom.price}</p>
                        <p className="card-text">Trạng thái: {RoomStatusTranslations[displayRoom.status]}</p>
                        <img src={imageUrl} alt="Room" className="room-card-img img-thumbnail mb-2" />
                        <Button variant="warning" onClick={() => onEditClick(room)} className="me-2">Sửa</Button>
                        <Button variant="danger" onClick={() => onDeleteClick(room)}>Xóa</Button>
                    </>
                )}
            </div>
        </div>
    );
};

export default RoomCard;
