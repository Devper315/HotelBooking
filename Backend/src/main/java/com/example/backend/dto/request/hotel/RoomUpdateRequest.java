package com.example.backend.dto.request.hotel;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomUpdateRequest {

    String type;
    Double price;
    String imagePath;


}
