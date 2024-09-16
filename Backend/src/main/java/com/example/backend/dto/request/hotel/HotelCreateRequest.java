package com.example.backend.dto.request.hotel;

import com.example.backend.entity.address.Ward;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class HotelCreateRequest {
    String name;
    String email;
    String phone;

    String houseNumber;
    String streetName;

    Long wardId;


}
