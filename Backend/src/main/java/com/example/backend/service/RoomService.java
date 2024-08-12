package com.example.backend.service;

import com.example.backend.dto.request.RoomCreateRequest;
import com.example.backend.dto.request.RoomUpdateRequest;
import com.example.backend.entity.Room;
import com.example.backend.entity.RoomStatus;
import com.example.backend.entity.RoomType;
import com.example.backend.mapper.RoomMapper;
import com.example.backend.repository.RoomRepo;
import com.example.backend.repository.RoomTypeRepo;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomService {

    RoomRepo roomRepo;
    RoomTypeService roomTypeService;
    RoomMapper roomMapper;

    public List<Room> getAll(){
        return roomRepo.findAll();
    }

    public Room getById(Long id){
        return roomRepo.findById(id).orElse(null);
    }

    public Room createRoom(RoomCreateRequest request){
        Room room = roomMapper.toRoom(request);
        RoomType roomType = roomTypeService.getById(request.getRoomTypeId());
        room.setType(roomType);
        room.setStatus(RoomStatus.AVAILABLE);
        return roomRepo.save(room);
    }

    public Room updateRoom(RoomUpdateRequest request, Long id){
        Room room = roomRepo.findById(id).get();
        room.setPrice(request.getPrice());
        room.setType(roomTypeService.getById(request.getRoomTypeId()));
        room.setImageUrl(request.getImageUrl());
        return roomRepo.save(room);
    }

    public void deleteById(Long id){
        roomRepo.deleteById(id);
    }
}
