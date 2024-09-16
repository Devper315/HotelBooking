package com.example.backend.dto.response.user;

import com.example.backend.entity.user.Role;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    Long id;
    String fullName;
    String email;
    String avatarPath;
    LocalDate dateOfBirth;
    Set<Role> roles;
}
