package com.example.backend.repository;

import com.example.backend.entity.Room;
import com.example.backend.model.RoomStatistical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepo extends JpaRepository<Room, Long> {
    @Query(value = "SELECT new com.example.backend.model.RoomStatistical(" +
            "SUM(CASE WHEN o.status = 'AVAILABLE' THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN o.status = 'BOOKED' THEN 1 ELSE 0 END)) " +
            "FROM Room o")
    RoomStatistical getRoomStatistical();

    @Query("SELECT r FROM Room r ORDER BY r.id")
    List<Room> findAllSortById();
}
