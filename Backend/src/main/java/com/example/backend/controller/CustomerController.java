package com.example.backend.controller;

import com.example.backend.dto.request.BookingCreateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.BookingResponse;
import com.example.backend.entity.Booking;
import com.example.backend.entity.Room;
import com.example.backend.mapper.BookingMapper;
import com.example.backend.service.BookingService;
import com.example.backend.service.RoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/customer")
public class CustomerController {

    BookingService bookingService;
    BookingMapper bookingMapper;

    @GetMapping("/booking")
    public ApiResponse<List<Booking>> getMyBooking() {
        List<Booking> bookingList = bookingService.getMyBooking();
        return ApiResponse.<List<Booking>>builder()
                .result(bookingList)
                .build();
    }

    @GetMapping("/booking/{bookingId}")
    public ApiResponse<BookingResponse> getBookingById(@PathVariable Long bookingId) {
        Booking booking = bookingService.getById(bookingId);
        BookingResponse response = bookingMapper.toBookingResponse(booking);
        return ApiResponse.<BookingResponse>builder()
                .result(response)
                .build();
    }


    @PostMapping("/booking")
    public ApiResponse<BookingResponse> createBooking(@RequestBody BookingCreateRequest request,
                                                      Authentication auth) {
        Booking booking = bookingService.createBooking(request, auth);
        BookingResponse response = bookingMapper.toBookingResponse(booking);
        return ApiResponse.<BookingResponse>builder()
                .result(response)
                .build();
    }

    @PatchMapping("/booking/{action}")
    public ApiResponse<String> manageStateBooking(@RequestParam Long id, @PathVariable String action) {
        String result = bookingService.manageStateBooking(id, action);
        return ApiResponse.<String>builder()
                .result(result)
                .build();
    }
}
