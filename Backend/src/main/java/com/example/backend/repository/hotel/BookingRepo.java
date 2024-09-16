package com.example.backend.repository.hotel;

import com.example.backend.entity.hotel.Booking;
import com.example.backend.entity.user.User;
import com.example.backend.model.BookingStatistical;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
    Page<Booking> findByCreateUser(User user, Pageable pageable);

    @Query("SELECT new com.example.backend.model.BookingStatistical(" +
            "COUNT(b.id), SUM(r.price)) " +
            "FROM Booking b " +
            "JOIN b.room r")
    BookingStatistical getBookingStatistical();
}
