package com.example.backend.controller;

import com.example.backend.dto.request.UserCreateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RegisterController {
    UserService userService;
    UserMapper userMapper;

    @PostMapping("/register")
    public ApiResponse<UserResponse> signup(@RequestBody UserCreateRequest request){
        User newUser = userService.createUser(request);
        UserResponse response = userMapper.toUserResponse(newUser);
        return ApiResponse.<UserResponse>builder()
                .result(response)
                .build();
    }
}
