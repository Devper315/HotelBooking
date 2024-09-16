package com.example.backend.entity.hotel;

import com.example.backend.entity.address.City;
import com.example.backend.entity.address.District;
import com.example.backend.entity.address.Ward;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String email;
    String phone;

    String houseNumber;
    String streetName;

    @ManyToOne
    Ward ward;


}
