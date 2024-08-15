package com.example.backend.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomCreateRequest {
    Integer roomNumber;
    String roomType;
    Double price;
    String imageUrl;

}
