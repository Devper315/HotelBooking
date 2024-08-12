package com.example.backend.controller;

import com.example.backend.dto.request.RoomCreateRequest;
import com.example.backend.dto.request.RoomUpdateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.RoomResponse;
import com.example.backend.entity.Room;
import com.example.backend.mapper.RoomMapper;
import com.example.backend.service.RoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin/room")
public class RoomController {

    RoomService roomService;
    RoomMapper roomMapper;

    @GetMapping("/all")
    public ApiResponse<List<Room>> getAllRoom(){
        List<Room> roomList = roomService.getAll();
        return ApiResponse.<List<Room>>builder()
                .result(roomList)
                .build();
    }

    @GetMapping
    public ApiResponse<Room> getRoomById(@RequestParam Long id){
        Room room = roomService.getById(id);
        return ApiResponse.<Room>builder()
                .result(room)
                .build();
    }

    @PostMapping
    public ApiResponse<Room> createRoom(@RequestBody RoomCreateRequest request){
        Room room = roomService.createRoom(request);
        return ApiResponse.<Room>builder()
                .result(room)
                .build();
    }

    @PutMapping
    public ApiResponse<RoomResponse> updateRoom(@RequestBody RoomUpdateRequest request,
                                        @RequestParam Long id){
        Room room = roomService.updateRoom(request, id);
        RoomResponse response = roomMapper.toRoomResponse(room);
        return ApiResponse.<RoomResponse>builder()
                .result(response)
                .build();
    }

    @DeleteMapping
    public String deleteRoomById(@RequestParam Long id){
        roomService.deleteById(id);
        return "Room has been deleted";
    }



}
