package com.example.backend.repository;

import com.example.backend.entity.Booking;
import com.example.backend.entity.User;
import com.example.backend.model.BookingStatistical;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
    List<Booking> findByCreateUser(User user);

    @Query("SELECT new com.example.backend.model.BookingStatistical(" +
            "COUNT(b.id), SUM(r.price)) " +
            "FROM Booking b " +
            "JOIN b.room r")
    BookingStatistical getBookingStatistical();
}
