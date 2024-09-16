package com.example.backend.service.hotel;

import com.example.backend.dto.request.hotel.BookingCreateRequest;
import com.example.backend.entity.hotel.*;
import com.example.backend.entity.user.User;
import com.example.backend.mapper.BookingMapper;
import com.example.backend.model.BookingStatistical;
import com.example.backend.repository.hotel.BookingRepo;
import com.example.backend.service.EmailService;
import com.example.backend.service.UserService;
import com.example.backend.utils.DateUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    public Booking createBooking(BookingCreateRequest request) {
        Booking booking = bookingMapper.toBooking(request);
        Room room = roomService.getById(request.getRoomId());
        room.setStatus(RoomStatus.BOOKED);
        User createUser = userService.getCurrentUser();
        booking.setRoom(room);
        booking.setCreateUser(createUser);
        booking.setBookingDate(DateUtils.reFormatDateTime(LocalDateTime.now()));
        booking.setStatus(BookingStatus.DRAFT);
        return bookingRepo.save(booking);
    }


    public List<Booking> getMyBooking(int page, int size) {
        User user = userService.getCurrentUser();
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(page, size, sort);
        return bookingRepo.findByCreateUser(user, pageable).getContent();
    }

    public List<Booking> getAllBooking(int page, int size) {
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(page, size, sort);
        return bookingRepo.findAll(pageable).getContent();
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
