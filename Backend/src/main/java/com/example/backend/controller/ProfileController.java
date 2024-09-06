package com.example.backend.controller;


import com.example.backend.dto.request.ChangePasswordRequest;
import com.example.backend.dto.request.RoomUpdateRequest;
import com.example.backend.dto.request.UserCreateRequest;
import com.example.backend.dto.request.UserUpdateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.UserResponse;
import com.example.backend.entity.Room;
import com.example.backend.entity.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.service.RoomService;
import com.example.backend.service.UserService;
import com.example.backend.utils.FirebaseUtils;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/profile")
public class ProfileController {

    UserService userService;
    UserMapper userMapper;

    @NonFinal
    @Value("${firebase.userPath}")
    String userImagePath;

    @GetMapping("/my-info")
    public ApiResponse<UserResponse> getUserInfo() {
        User user = userService.getCurrentUser();
        UserResponse response = userMapper.toUserResponse(user);
        return ApiResponse.<UserResponse>builder()
                .result(response)
                .build();
    }

    @PutMapping
    public ApiResponse<UserResponse> updateUser(@RequestBody UserUpdateRequest request,
                                                Authentication auth) {
        User user = userService.updateUser(request, auth);
        UserResponse userResponse = userMapper.toUserResponse(user);
        return ApiResponse.<UserResponse>builder()
                .result(userResponse)
                .build();
    }

    @PostMapping("upload-image")
    public ApiResponse<String> uploadImage(@RequestParam MultipartFile file,
                                           @RequestParam String fileName,
                                           Authentication auth) {
        String result = FirebaseUtils.uploadImage(file, userImagePath + fileName);
        if (!result.equals("Upload failed")) {
            UserUpdateRequest request = new UserUpdateRequest();
            request.setAvatarPath(result);
            userService.updateUser(request, auth);
        }
        return ApiResponse.<String>builder()
                .result(result)
                .build();
    }

    @PostMapping("/change-password")
    public ApiResponse<String> changePassword(@RequestBody ChangePasswordRequest request,
                                              Authentication auth) {
        String result = userService.changePassword(request, auth);
        return ApiResponse.<String>builder()
                .result(result)
                .build();
    }


}
