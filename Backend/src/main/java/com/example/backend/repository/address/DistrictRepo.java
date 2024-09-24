package com.example.backend.repository.address;

import com.example.backend.entity.address.City;
import com.example.backend.entity.address.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepo extends JpaRepository<District, Long> {

    @Query("SELECT d FROM District d WHERE d.city.id = :cityId")
    List<District> findByCityId(Long cityId);
}
