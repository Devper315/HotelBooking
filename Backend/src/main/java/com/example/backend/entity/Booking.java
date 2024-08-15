package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    User createUser;

    @ManyToOne
    Room room;

    String customerName;

    @Enumerated(EnumType.STRING)
    BookingStatus status;

    String bookingDate;
    LocalDate checkInDate;
    LocalDate checkOutDate;
}
