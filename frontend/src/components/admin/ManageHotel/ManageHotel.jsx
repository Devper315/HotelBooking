import React, { useEffect, useState } from "react";
import { fetchAllHotel } from "../../../services/HotelAPI";
import HotelCard from "./HotelCard";

const ManageHotel = () => {
    const [hotels, setHotels] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingHotelId, setEditingHotelId] = useState(null)
    const [isAdding, setIsAdding] = useState(false)
    const [editedHotel, setEditedHotel] = useState({})
    const [newHotel, setNewHotel] = useState({})
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [hotelDelete, setHotelDelete] = useState({})
    const [previewImage, setPreviewImage] = useState(null); 
    useEffect(() => {
        const getHotels = async () => {
            const hotels = await fetchAllHotel()
            setHotels(hotels)
            setIsLoading(false)
        }
        getHotels()
    }, [])

    return(
        <div>
            <div>
                <div className="row">
                    {hotels.map(hotel => (
                        <div key={hotel.id}>
                            <HotelCard
                                hotel={hotel}
                                editedHotel={hotel}
                                isEditing={editingHotelId === hotel.id}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ManageHotel

