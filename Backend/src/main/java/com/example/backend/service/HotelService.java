package com.example.backend.service;

import com.example.backend.entity.Hotel;
import com.example.backend.repository.HotelRepo;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HotelService {
    HotelRepo hotelRepo;

    public Hotel getMyHotel(){
        return hotelRepo.findAll().get(0);
    }
}
