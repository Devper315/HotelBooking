package com.example.backend.mapper;

import com.example.backend.dto.request.RoomCreateRequest;
import com.example.backend.dto.response.RoomResponse;
import com.example.backend.entity.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoomMapper {
    @Mapping(target = "type", ignore = true)
    Room toRoom(RoomCreateRequest request);

    RoomResponse toRoomResponse(Room room);
}
