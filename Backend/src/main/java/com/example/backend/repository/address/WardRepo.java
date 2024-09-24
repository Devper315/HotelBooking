package com.example.backend.repository.address;

import com.example.backend.entity.address.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WardRepo extends JpaRepository<Ward, Long> {

    @Query("SELECT w FROM Ward w WHERE w.district.id = :districtId")
    List<Ward> findByDistrictId(Long districtId);
}
