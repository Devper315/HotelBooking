package com.example.backend.service.address;

import com.example.backend.dto.response.address.DistrictResponse;
import com.example.backend.entity.address.City;
import com.example.backend.repository.address.CityRepo;
import com.example.backend.repository.address.DistrictRepo;
import com.example.backend.utils.AddressUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DistrictService {
    DistrictRepo districtRepo;
    public List<DistrictResponse> getByCityId(Long cityId){
        return AddressUtils.converDistrictList(districtRepo.findByCityId(cityId));
    }
}
