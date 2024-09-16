package com.example.backend.dto.request.hotel;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingCreateRequest {

    Long roomId;
    String customerName;
    String phoneNumber;
    LocalDate bookingDate;
    LocalDate checkInDate;
    LocalDate checkOutDate;
}
