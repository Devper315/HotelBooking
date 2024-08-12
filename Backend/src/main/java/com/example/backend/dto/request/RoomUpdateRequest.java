package com.example.backend.dto.request;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomUpdateRequest {

    Long roomTypeId;
    Double price;
    String imageUrl;

}
