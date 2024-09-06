package com.example.backend.controller;

import com.example.backend.dto.request.IntrospectRequest;
import com.example.backend.dto.request.LoginRequest;
import com.example.backend.dto.request.UserCreateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.IntrospectResponse;
import com.example.backend.dto.response.LoginResponse;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.service.AuthService;
import com.example.backend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/auth")
public class AuthController {
    AuthService authService;
    UserService userService;
    UserMapper userMapper;
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request){
        LoginResponse result = authService.authenticate(request);
        return ApiResponse.<LoginResponse>builder()
                .result(result)
                .build();
    }
    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request){
        IntrospectResponse result = authService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder().result(result).build();
    }
}
