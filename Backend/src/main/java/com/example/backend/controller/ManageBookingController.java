package com.example.backend.controller;

import com.example.backend.dto.response.ApiResponse;
import com.example.backend.entity.Booking;
import com.example.backend.model.BookingStatistical;
import com.example.backend.service.BookingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin/booking")
public class ManageBookingController {

    BookingService bookingService;

    @GetMapping("/statistical")
    public ApiResponse<BookingStatistical> getBookingStatistical() {
        return ApiResponse.<BookingStatistical>builder()
                .result(bookingService.getBookingStatistical())
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<Booking>> getAllBooking() {
        return ApiResponse.<List<Booking>>builder()
                .result(bookingService.getAllBooking())
                .build();
    }

    @PatchMapping("/{action}")
    public ApiResponse<String> manageStateBooking(@RequestParam Long id, @PathVariable String action) {
        String result = bookingService.manageStateBooking(id, action);
        return ApiResponse.<String>builder()
                .result(result)
                .build();
    }



}
