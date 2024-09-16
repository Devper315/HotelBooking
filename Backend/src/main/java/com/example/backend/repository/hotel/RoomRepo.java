package com.example.backend.repository.hotel;

import com.example.backend.entity.hotel.Room;
import com.example.backend.model.RoomStatistical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepo extends JpaRepository<Room, Long> {
    @Query(value = "SELECT new com.example.backend.model.RoomStatistical(" +
            "SUM(CASE WHEN o.status = 'AVAILABLE' THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN o.status = 'BOOKED' THEN 1 ELSE 0 END)) " +
            "FROM Room o")
    RoomStatistical getRoomStatistical();

}
