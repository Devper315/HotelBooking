package com.example.backend.service;

import com.example.backend.dto.request.BookingCreateRequest;
import com.example.backend.entity.*;
import com.example.backend.mapper.BookingMapper;
import com.example.backend.repository.BookingRepo;
import com.example.backend.utils.DateUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BookingService {
    BookingRepo bookingRepo;
    BookingMapper bookingMapper;

    RoomService roomService;
    UserService userService;
    public Booking createBooking(BookingCreateRequest request, Authentication auth){
        Booking booking = bookingMapper.toBooking(request);
        Room room = roomService.getById(request.getRoomId());
        room.setStatus(RoomStatus.BOOKED);
        User createUser = userService.getByAuth(auth);
        booking.setRoom(room);
        booking.setCreateUser(createUser);
        booking.setBookingDate(DateUtils.getCurrentDate());
        booking.setStatus(BookingStatus.BOOKED);
        return bookingRepo.save(booking);
    }


    public List<Booking> getByAuth(Authentication auth) {
        User user = userService.getByAuth(auth);
        return bookingRepo.findByCreateUser(user);
    }

    public Booking getById(Long bookingId) {
        return bookingRepo.findById(bookingId).get();
    }
}
