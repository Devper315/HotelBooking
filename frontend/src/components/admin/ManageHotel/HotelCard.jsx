import React, { useEffect, useState } from "react";
import { fetchImageURL } from "../../../services/hotel/RoomAPI";

const HotelCard = ({ hotel, editedHotel, isEditing, onEditClick, onDeleteClick,
    onFieldChange, onFinishEdit}) => {
    
    const displayHotel = isEditing ? editedHotel : hotel
    const [imageUrls, setImageUrls] = useState([])
    

    return (
        <div>
            <div>
                {isEditing ? 
                <>
                <
                </>
                :
                <>
                <p>{hotel.name}</p>
                <p>Email: {hotel.email}</p>
                <p>Phone: {hotel.phone}</p>
                <p>Địa chỉ: {hotel.houseNumber}, {hotel.streetName}, {hotel.ward.name},
                    {" " + hotel.ward.district.name}, {hotel.ward.district.city.name}</p>
                </>
                }
                
            </div>
        </div>
    )
}

export default HotelCard;