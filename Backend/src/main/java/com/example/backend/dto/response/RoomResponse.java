package com.example.backend.dto.response;

import com.example.backend.entity.RoomStatus;
import com.example.backend.entity.RoomType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RoomResponse {
    Long id;

    Integer roomNumber;

    RoomType type; // Deluxe, Standard, Suite

    Double price;

    RoomStatus status; // Available, Booked

    String imageUrl;

}
