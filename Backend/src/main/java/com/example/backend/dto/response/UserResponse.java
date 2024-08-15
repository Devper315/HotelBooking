package com.example.backend.dto.response;

import com.example.backend.entity.Role;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    Long id;
    String fullName;
    String email;
    String avatarPath;
    LocalDate dateOfBirth;
    Set<Role> roles;
}
