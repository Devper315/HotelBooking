package com.example.backend.mapper;

import com.example.backend.dto.request.hotel.RoomCreateRequest;
import com.example.backend.entity.hotel.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    @Mapping(target = "type", ignore = true)
    Room toRoom(RoomCreateRequest request);
}
