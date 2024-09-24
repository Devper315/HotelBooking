package com.example.backend.repository.address;

import com.example.backend.entity.address.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepo extends JpaRepository<City, Long> {

}
