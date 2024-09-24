package com.example.backend.service.address;

import com.example.backend.dto.response.address.DistrictResponse;
import com.example.backend.dto.response.address.WardResponse;
import com.example.backend.entity.address.Ward;
import com.example.backend.repository.address.DistrictRepo;
import com.example.backend.repository.address.WardRepo;
import com.example.backend.utils.AddressUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WardService {
    WardRepo wardRepo;
    public List<WardResponse> getByDistrictId(Long districtId){
        return AddressUtils.converWardList(wardRepo.findByDistrictId(districtId));
    }

    public Ward getById(Long id){
        return wardRepo.findById(id).orElse(null);
    }
}
