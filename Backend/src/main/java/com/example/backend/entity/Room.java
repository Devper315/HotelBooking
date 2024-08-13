package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "room")
@FieldDefaults(level = AccessLevel.PRIVATE)

public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Integer roomNumber;

    @ManyToOne
    RoomType type; // Deluxe, Standard, Suite

    Double price;

    @Enumerated(EnumType.STRING)
    RoomStatus status;
    String imagePath;
}
