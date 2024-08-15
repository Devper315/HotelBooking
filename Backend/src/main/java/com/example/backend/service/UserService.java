package com.example.backend.service;

import com.example.backend.dto.request.ChangePasswordRequest;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepo userRepo;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;
    RoleService roleService;

    public List<User> getAll(){
        return userRepo.findAll();
    }

    public User getById(Long id){
        return userRepo.findById(id).orElse(null);
    }

    public User getByAuth(Authentication auth){
        Long userId = getCurrentUserId(auth);
        return getById(userId);
    }
    public User createUser(UserCreateRequest request){
        if (userRepo.existsByEmail(request.getEmail()))
            throw new RuntimeException("Email đã được sử dụng");
        User user = userMapper.toUser(request);
        user.setEmail(user.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        List<Role> roles = new ArrayList<>();
        roles.add(roleService.getByName("USER"));
        user.setRoles(new HashSet<>(roles));
        user = userRepo.save(user);
        return user;
    }


    public void deleteById(Long id){
        userRepo.deleteById(id);
    }

    public Long getCurrentUserId(Authentication auth) {
        JwtAuthenticationToken jwtAuth = (JwtAuthenticationToken) auth;
        Map<String, Object> customClaim = (Map<String, Object>) jwtAuth.getTokenAttributes().get("customClaim");
        return Long.valueOf(customClaim.get("id").toString());
    }

    public User updateUser(UserUpdateRequest request, Authentication auth) {
        User user = getByAuth(auth);
        if (request.getAvatarPath() != null){
            user.setAvatarPath(request.getAvatarPath());
        }
        else {
            user.setFullName(request.getFullName());
            user.setDateOfBirth(request.getDateOfBirth());
        }
        return userRepo.save(user);
    }

    public String changePassword(ChangePasswordRequest request, Authentication auth) {
        User user = getByAuth(auth);
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())){
            return "Lỗi: mật khẩu cũ không chính xác";
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepo.save(user);
        return "Đổi mật khẩu thành công";
    }
}
