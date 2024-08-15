package com.example.backend.mapper;

import com.example.backend.dto.request.BookingCreateRequest;
import com.example.backend.dto.request.RoomCreateRequest;
import com.example.backend.dto.response.BookingResponse;
import com.example.backend.dto.response.RoomResponse;
import com.example.backend.entity.Booking;
import com.example.backend.entity.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.awt.print.Book;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    @Mapping(target = "createUser", ignore = true)
    @Mapping(target = "room", ignore = true)
    Booking toBooking(BookingCreateRequest request);

    BookingResponse toBookingResponse(Booking booking);
}
