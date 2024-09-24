package com.example.backend.dto.response.address;

import com.example.backend.entity.address.Ward;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WardResponse {
    Long id;
    String name;

    public WardResponse(Ward ward){
        this.id = ward.getId();
        this.name = ward.getName();
    }
}
