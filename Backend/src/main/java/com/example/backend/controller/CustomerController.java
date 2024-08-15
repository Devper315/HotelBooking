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
public class CustomerController {

    BookingService bookingService;
    BookingMapper bookingMapper;
    RoomService roomService;

    @GetMapping("/room/all")
    public ApiResponse<List<Room>> getAllRoom(){
        List<Room> roomList = roomService.getAll();
        return ApiResponse.<List<Room>>builder()
                .result(roomList)
                .build();
    }

    @GetMapping("customer/booking")
    public ApiResponse<List<Booking>> getAllBooking(Authentication auth){
        List<Booking> bookingList = bookingService.getByAuth(auth);
        return ApiResponse.<List<Booking>>builder()
                .result(bookingList)
                .build();
    }

    @GetMapping("customer/booking/{bookingId}")
    public ApiResponse<BookingResponse> getBookingById(@PathVariable Long bookingId){
        Booking booking = bookingService.getById(bookingId);
        BookingResponse response = bookingMapper.toBookingResponse(booking);
        return ApiResponse.<BookingResponse>builder()
                .result(response)
                .build();
    }

    @PostMapping("/customer/booking")
    public ApiResponse<BookingResponse> createBooking(@RequestBody BookingCreateRequest request,
                                                      Authentication auth) {
        Booking booking = bookingService.createBooking(request, auth);
        BookingResponse response = bookingMapper.toBookingResponse(booking);
        return ApiResponse.<BookingResponse>builder()
                .result(response)
                .build();
    }
}
