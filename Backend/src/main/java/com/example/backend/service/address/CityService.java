package com.example.backend.service.address;

import com.example.backend.entity.address.City;
import com.example.backend.repository.address.CityRepo;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CityService {
    CityRepo cityRepo;

    public List<City> getAll(){
        return cityRepo.findAll();
    }
}
