package com.example.backend.repository.hotel;

import com.example.backend.entity.hotel.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomTypeRepo extends JpaRepository<RoomType, Long> {
    RoomType findByName(String name);
}
