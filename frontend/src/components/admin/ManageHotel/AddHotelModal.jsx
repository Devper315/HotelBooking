import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import AddressSelector from "../../common/AddressSelector";

const AddHotelModal = ({ show, newHotel, errors,
    setNewHotel, onHide, onFieldChange, onSaveClick }) => {

    const handleAddressChange = (newAddress) => {
        setNewHotel({...newHotel, ward: newAddress})
    };


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm khách sạn mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label htmlFor="name">Tên khách sạn</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={onFieldChange}
                        value={newHotel.name} /><br></br>
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="text" name="email"
                        onChange={onFieldChange} value={newHotel.email} /><br></br>
                    {errors.email && <span>{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor="phone">Số điện thoại</label>
                    <input id="phone" type="text" name="phone"
                        onChange={onFieldChange} value={newHotel.phone} /><br></br>
                    {errors.phone && <span>{errors.phone}</span>}
                </div>

                <AddressSelector onChangeAddress={handleAddressChange} />
                <div>
                    <label htmlFor="houseNumber">Số nhà</label>
                    <input id="houseNumber" name="houseNumber" type="text"
                        onChange={onFieldChange} value={newHotel.houseNumber} /><br></br>
                </div>
                <div>
                    <label htmlFor="streetName">Tên đường</label>
                    <input id="streetName" name="streetName" type="text"
                        onChange={onFieldChange} value={newHotel.streetName} /><br></br>
                    {errors.address && <span>{errors.address}</span>}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onSaveClick}>Lưu</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddHotelModal