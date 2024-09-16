package com.example.backend.service.hotel;

import com.example.backend.entity.hotel.Hotel;
import com.example.backend.repository.hotel.HotelRepo;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class HotelService {
    HotelRepo hotelRepo;

    public Hotel getMyHotel(){
        return hotelRepo.findAll().get(0);
    }

    public List<Hotel> getAll(int page, int size){
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(page, size, sort);
        return hotelRepo.findAll(pageable).getContent();
    }

    public Hotel getById(Long id){
        return hotelRepo.findById(id).orElse(null);
    }

    public void deleteById(Long id){
        hotelRepo.deleteById(id);
    }
}
