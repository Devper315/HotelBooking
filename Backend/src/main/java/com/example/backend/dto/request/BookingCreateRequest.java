package com.example.backend.dto.request;

import com.example.backend.entity.Room;
import com.example.backend.entity.User;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingCreateRequest {

    Long roomId;
    String customerName;
    String phoneNumber;
    LocalDate bookingDate;
    LocalDate checkInDate;
    LocalDate checkOutDate;
}
