package com.example.backend.service;

import com.example.backend.dto.request.UserCreateRequest;
import com.example.backend.dto.request.UserUpdateRequest;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.RoleRepo;
import com.example.backend.repository.UserRepo;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepo userRepo;
    RoleRepo roleRepo;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    public List<User> getAll(){
        return userRepo.findAll();
    }

    public User getById(Long id){
        return userRepo.findById(id).orElse(null);
    }

    public User createUser(UserCreateRequest request){
        if (userRepo.existsByEmail(request.getEmail()))
            throw new RuntimeException("Email đã được sử dụng");
        User user = userMapper.toUser(request);
        user.setEmail(user.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        List<Role> roles = roleRepo.findAllById(request.getRoleIds());
        user.setRoles(new HashSet<>(roles));
        user = userRepo.save(user);
        return user;
    }

    public User updateUser(UserUpdateRequest request, Long id){
        User user = userRepo.findById(id).get();
        user.setFullName(request.getFullName());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        List<Role> roles = roleRepo.findAllById(request.getRoleIds());
        user.setRoles(new HashSet<>(roles));
        return userRepo.save(user);
    }

    public void deleteById(Long id){
        userRepo.deleteById(id);
    }
}
