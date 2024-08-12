package com.example.backend.utils;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;

public class DateUtils {

    public static Date addSecondsToDate(Date currentDate, long seconds) {
        return new Date(currentDate.toInstant().plus(Duration.ofSeconds(seconds)).toEpochMilli());
    }

}
