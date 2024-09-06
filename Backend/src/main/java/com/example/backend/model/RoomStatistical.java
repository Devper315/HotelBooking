package com.example.backend.model;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomStatistical {
    Long available;
    Long booked;
    Long total;

    public RoomStatistical(Long available, Long booked) {
        this.available = available;
        this.booked = booked;
        this.total = available + booked;
    }
}
