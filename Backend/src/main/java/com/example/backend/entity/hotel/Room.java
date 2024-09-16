package com.example.backend.entity.hotel;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Integer roomNumber;

    @ManyToOne
    RoomType type;

    Double price;

    @Enumerated(EnumType.STRING)
    RoomStatus status;
    String imagePath;
}
