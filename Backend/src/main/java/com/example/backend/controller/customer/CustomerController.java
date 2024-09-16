package com.example.backend.controller.customer;

import com.example.backend.dto.request.chat.MessageCreateRequest;
import com.example.backend.dto.request.hotel.BookingCreateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.chat.MessageResponse;
import com.example.backend.entity.chat.Conversation;
import com.example.backend.entity.hotel.Booking;
import com.example.backend.service.chat.ConversationService;
import com.example.backend.service.chat.MessageService;
import com.example.backend.service.hotel.BookingService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/customer")
public class CustomerController {

    BookingService bookingService;

    @GetMapping("/booking")
    public ApiResponse<List<Booking>> getMyBooking(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<Booking> bookingList = bookingService.getMyBooking(page, size);
        return ApiResponse.<List<Booking>>builder()
                .result(bookingList)
                .build();
    }

    @GetMapping("/booking/{bookingId}")
    public ApiResponse<Booking> getBookingById(@PathVariable Long bookingId) {
        return ApiResponse.<Booking>builder()
                .result(bookingService.getById(bookingId))
                .build();
    }


    @PostMapping("/booking")
    public ApiResponse<Booking> createBooking(@RequestBody BookingCreateRequest request) {
        return ApiResponse.<Booking>builder()
                .result(bookingService.createBooking(request))
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
