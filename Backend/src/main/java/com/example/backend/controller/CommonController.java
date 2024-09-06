package com.example.backend.controller;

import com.example.backend.dto.response.ApiResponse;
import com.example.backend.entity.Room;
import com.example.backend.service.RoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommonController {
    RoomService roomService;

    @GetMapping("/room/all")
    public ApiResponse<List<Room>> getAllRoom() {
        List<Room> roomList = roomService.getAll();
        return ApiResponse.<List<Room>>builder()
                .result(roomList)
                .build();
    }
}
