package com.example.backend.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomUpdateRequest {

    String roomType;
    Double price;
    String imagePath;


}
