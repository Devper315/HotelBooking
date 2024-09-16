package com.example.backend.controller.admin;

import com.example.backend.dto.request.user.UserCreateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.user.UserResponse;
import com.example.backend.entity.user.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/hotel/admin/user")
public class ManageUserController {
    UserService userService;
    UserMapper userMapper;

    @GetMapping("/all")
    public ApiResponse<List<User>> getAllUser(){
        List<User> userList = userService.getAll();
        return ApiResponse.<List<User>>builder()
                .result(userList)
                .build();
    }

    @GetMapping
    public ApiResponse<User> getUserById(@RequestParam Long id){
        User user = userService.getById(id);
        return ApiResponse.<User>builder()
                .result(user)
                .build();
    }

    @PostMapping
    public ApiResponse<UserResponse> createUser(@RequestBody UserCreateRequest request){
        User user = userService.createUser(request);
        UserResponse userResponse = userMapper.toUserResponse(user);
        return ApiResponse.<UserResponse>builder()
                .result(userResponse)
                .build();
    }



    @DeleteMapping
    public String deleteUser(@RequestParam Long id){
        userService.deleteById(id);
        return "User has been deleted";
    }


}
