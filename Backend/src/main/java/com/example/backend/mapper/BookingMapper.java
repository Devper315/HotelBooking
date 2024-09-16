package com.example.backend.mapper;

import com.example.backend.dto.request.hotel.BookingCreateRequest;
import com.example.backend.entity.hotel.Booking;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    @Mapping(target = "createUser", ignore = true)
    @Mapping(target = "room", ignore = true)
    Booking toBooking(BookingCreateRequest request);

}
