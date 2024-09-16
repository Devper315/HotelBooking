package com.example.backend.controller.common;

import com.example.backend.dto.request.user.UserCreateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.user.UserResponse;
import com.example.backend.entity.hotel.Room;
import com.example.backend.entity.user.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.service.UserService;
import com.example.backend.service.hotel.RoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/hotel")
public class CommonController {
    RoomService roomService;
    UserService userService;
    UserMapper userMapper;

    @GetMapping("/room/all")
    public ApiResponse<List<Room>> getAllRoom(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<Room> roomList = roomService.getAll(page, size);
        return ApiResponse.<List<Room>>builder()
                .result(roomList)
                .build();
    }

    @PostMapping("/register")
    public ApiResponse<UserResponse> signup(@RequestBody UserCreateRequest request){
        User newUser = userService.createUser(request);
        UserResponse response = userMapper.toUserResponse(newUser);
        return ApiResponse.<UserResponse>builder()
                .result(response)
                .build();
    }
}
