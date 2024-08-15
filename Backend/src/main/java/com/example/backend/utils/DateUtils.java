package com.example.backend.utils;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateUtils {

    public static Date addSecondsToDate(Date currentDate, long seconds) {
        return new Date(currentDate.toInstant().plus(Duration.ofSeconds(seconds)).toEpochMilli());
    }

    public static String getCurrentDate(){
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return currentDateTime.format(formatter);
    }

}
