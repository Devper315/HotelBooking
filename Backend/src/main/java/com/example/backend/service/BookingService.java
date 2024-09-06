package com.example.backend.service;

import com.example.backend.dto.request.BookingCreateRequest;
import com.example.backend.entity.*;
import com.example.backend.mapper.BookingMapper;
import com.example.backend.model.BookingStatistical;
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
    HotelService hotelService;
    EmailService emailService;

    public Booking createBooking(BookingCreateRequest request, Authentication auth) {
        Booking booking = bookingMapper.toBooking(request);
        Room room = roomService.getById(request.getRoomId());
        room.setStatus(RoomStatus.BOOKED);
        User createUser = userService.getCurrentUser();
        booking.setRoom(room);
        booking.setCreateUser(createUser);
        booking.setBookingDate(DateUtils.getCurrentDate());
        booking.setStatus(BookingStatus.DRAFT);
        return bookingRepo.save(booking);
    }


    public List<Booking> getMyBooking() {
        User user = userService.getCurrentUser();
        return bookingRepo.findByCreateUser(user);
    }

    public List<Booking> getAllBooking() {
        return bookingRepo.findAll();
    }

    public Booking getById(Long bookingId) {
        return bookingRepo.findById(bookingId).get();
    }

    public BookingStatistical getBookingStatistical() {
        return bookingRepo.getBookingStatistical();
    }

    public String manageStateBooking(Long id, String action) {
        Booking booking = getById(id);
        booking.setStatus(BookingStatus.valueOf(action.toUpperCase()));
        if (!action.equals("APPROVE")) booking.getRoom().setStatus(RoomStatus.AVAILABLE);
        else {
            booking.getRoom().setStatus(RoomStatus.BOOKED);
            String emailTo = booking.getCreateUser().getEmail();
            Hotel hotel = hotelService.getMyHotel();
            emailService.sendHtmlEmail(emailTo, booking, hotel);
        }
        bookingRepo.save(booking);

        return action + "complete";
    }

}
