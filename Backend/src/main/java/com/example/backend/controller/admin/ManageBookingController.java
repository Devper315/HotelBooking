package com.example.backend.controller.admin;

import com.example.backend.dto.response.ApiResponse;
import com.example.backend.entity.hotel.Booking;
import com.example.backend.model.BookingStatistical;
import com.example.backend.service.hotel.BookingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/hotel/admin/booking")
public class ManageBookingController {

    BookingService bookingService;

    @GetMapping("/statistical")
    public ApiResponse<BookingStatistical> getBookingStatistical() {
        return ApiResponse.<BookingStatistical>builder()
                .result(bookingService.getBookingStatistical())
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<List<Booking>> getAllBooking(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ApiResponse.<List<Booking>>builder()
                .result(bookingService.getAllBooking(page, size))
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
