package com.example.backend.dto.response;

import com.example.backend.entity.Room;
import com.example.backend.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingResponse {
    Long id;
    Room room;
    User createUser;
    String customerName;
    String phoneNumber;
    String bookingDate;
    LocalDate checkInDate;
    LocalDate checkOutDate;
}
