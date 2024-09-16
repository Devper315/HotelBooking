import React, { useEffect, useState } from "react";
import { fetchImageURL } from "../../../services/hotel/RoomAPI";

const HotelCard = ({ hotel, editedHotel, isEditing }) => {
    const displayRoom = isEditing ? hotel : editedHotel
    const [imageUrl, setImageUrl] = useState('')
    useEffect = (() => {
        const getImageUrl = async () => {
            const url = await fetchImageURL(hotel.imagePath)
            setImageUrl(url)
        }
        getImageUrl()
    }, [hotel])

    return (
        <div>
            <div>
                <p>{hotel.name}</p>
                <p>Email: {hotel.email}</p>
                <p>Phone: {hotel.phone}</p>
                <p>Địa chỉ: {hotel.houseNumber}, {hotel.streetName}, {hotel.ward.name}, 
                            {hotel.ward.district.name}, {hotel.ward.district.city.name}</p>
            </div>
        </div>
    )
}

export default HotelCard;