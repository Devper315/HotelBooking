package com.example.backend.service;

import com.example.backend.dto.request.user.ChangePasswordRequest;
import com.example.backend.dto.request.user.UserCreateRequest;
import com.example.backend.dto.request.user.UserUpdateRequest;
import com.example.backend.entity.user.Role;
import com.example.backend.entity.user.User;
import com.example.backend.exception.AppException;
import com.example.backend.exception.ErrorCode;
import com.example.backend.mapper.UserMapper;
import com.example.backend.repository.UserRepo;
import com.example.backend.service.auth.RoleService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

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

    
    public User createUser(UserCreateRequest request){
        if (userRepo.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.USER_EXISTED);
        User user = userMapper.toUser(request);
        user.setEmail(user.getEmail().toLowerCase());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        List<Role> roles = new ArrayList<>();
        roles.add(roleService.getByName("CUSTOMER"));
        user.setRoles(new HashSet<>(roles));
        user = userRepo.save(user);
        return user;
    }


    public void deleteById(Long id){
        userRepo.deleteById(id);
    }

    public User getCurrentUser() {
        return getByEmail(getCurrentUserEmail());
    }

    public String getCurrentUserEmail(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    public User getByEmail(String email) {
        return userRepo.findByEmail(email.toLowerCase());
    }

    public User updateUser(UserUpdateRequest request, Authentication auth) {
        User user = getCurrentUser();
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
        User user = getCurrentUser();
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())){
            throw new AppException(ErrorCode.WRONG_PASSWORD);
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepo.save(user);
        return "Đổi mật khẩu thành công";
    }

    public User getAdminOnline(){
        // tạm fix cứng
        return userRepo.findByEmail("admin@gmail.com");
    }


}
