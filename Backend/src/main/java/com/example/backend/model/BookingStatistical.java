package com.example.backend.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingStatistical {
    Long totalBooking;
    Double revenue;

    public BookingStatistical(Long totalBooking, Double revenue) {
        this.totalBooking = totalBooking;
        this.revenue = revenue;
    }
}
