package com.example.backend.mapper;

import com.example.backend.dto.request.hotel.HotelCreateRequest;
import com.example.backend.dto.request.user.UserCreateRequest;
import com.example.backend.dto.response.user.UserResponse;
import com.example.backend.entity.hotel.Hotel;
import com.example.backend.entity.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HotelMapper {
    Hotel toHotel(HotelCreateRequest request);

}
