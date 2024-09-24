import React, { useEffect, useState } from "react";
import { createHotel, fetchAllHotel } from "../../../services/hotel/HotelAPI";
import HotelCard from "./HotelCard";
import AddHotelModal from "./AddHotelModal";

const ManageHotel = () => {
    const defaultHotel = {
        name: "", email: "", phone: "",
        houseNumber: "", streetName: "", ward: ""
    }
    const [hotels, setHotels] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingHotelId, setEditingHotelId] = useState(null)
    const [isAdding, setIsAdding] = useState(false)
    const [editedHotel, setEditedHotel] = useState({})
    const [newHotel, setNewHotel] = useState(defaultHotel)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [hotelDelete, setHotelDelete] = useState({})
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({})
    

    useEffect(() => {
        const getHotels = async () => {
            const hotelData = await fetchAllHotel()
            setHotels(hotelData)
            setIsLoading(false)
        }
        getHotels()
    }, [])

    const handleAddClick = () => {
        setIsAdding(true)
    }

    const handleFieldChange = (e) => {
        const { name, value } = e.target
        if (isAdding) setNewHotel({ ...newHotel, [name]: value })
        else setEditedHotel({ ...editedHotel, [name]: value })
    }

    const handleAddSaveClick = async () => {
        if (validateHotel(newHotel)) {
            const hotelCreated = await createHotel(newHotel)
            setHotels([...hotels, hotelCreated])
            setNewHotel(defaultHotel)
            setIsAdding(false)
        }
    }

    const validateHotel = (hotel) => {
        let errors = {}
        if (!hotel.name) errors.name = "Tên khách sạn không được để trống"
        if (!hotel.email)
            errors.email = 'Email không được để trống';
        else if (!/\S+@\S+\.\S+/.test(hotel.email)) {
            errors.email = 'Email không hợp lệ';
        }
        if (!hotel.phone) errors.phone = "Số điện thoại không được để trống"
        if (!hotel.ward || !hotel.houseNumber || !hotel.streetName) errors.address = "Địa chỉ không hợp lệ"
        setErrors(errors)
        if (Object.keys(errors).length > 0) return false
        return true
    }

    

    return (
        <div>
            <h1 className="mb-4">Danh sách khách sạn</h1>
            <button className="btn btn-primary mb-4" onClick={handleAddClick}>Thêm khách sạn mới</button>
            <div>
                {hotels.map(hotel =>
                    <div key={hotel.id}>
                        <HotelCard hotel={hotel} />
                    </div>
                )}
            </div>
            <AddHotelModal
                show={isAdding} newHotel={newHotel} errors={errors}
                onHide={() => setIsAdding(false)} setNewHotel={setNewHotel}
                onFieldChange={handleFieldChange}
                onSaveClick={handleAddSaveClick} />
        </div>
    )
}

export default ManageHotel

