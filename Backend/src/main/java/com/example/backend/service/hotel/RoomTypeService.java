package com.example.backend.service.hotel;

import com.example.backend.entity.hotel.RoomType;
import com.example.backend.repository.hotel.RoomTypeRepo;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomTypeService {
    RoomTypeRepo roomTypeRepo;

    public List<RoomType> getAll(){
        return roomTypeRepo.findAll();
    }

    public RoomType getById(Long id){
        return roomTypeRepo.findById(id).orElse(null);
    }

    public RoomType getByName(String name){
        return roomTypeRepo.findByName(name);
    }
}
