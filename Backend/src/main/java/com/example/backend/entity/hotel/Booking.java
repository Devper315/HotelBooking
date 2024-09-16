package com.example.backend.entity.hotel;

import com.example.backend.entity.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

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
