package com.example.backend.controller;

import com.example.backend.dto.request.RoomCreateRequest;
import com.example.backend.dto.request.RoomUpdateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.RoomResponse;
import com.example.backend.entity.Room;
import com.example.backend.mapper.RoomMapper;
import com.example.backend.service.RoomService;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin/room")
public class ManageRoomController {

    @NonFinal
    @Value("${firebase.roomPath}")
    String roomImagePath;
    RoomService roomService;
    RoomMapper roomMapper;

    @GetMapping("/all")
    public ApiResponse<List<Room>> getAllRoom() {
        List<Room> roomList = roomService.getAll();
        return ApiResponse.<List<Room>>builder()
                .result(roomList)
                .build();
    }

    @GetMapping
    public ApiResponse<Room> getRoomById(@RequestParam Long id) {
        Room room = roomService.getById(id);
        return ApiResponse.<Room>builder()
                .result(room)
                .build();
    }

    @PostMapping
    public ApiResponse<RoomResponse> createRoom(@RequestBody RoomCreateRequest request) {
        Room room = roomService.createRoom(request);
        RoomResponse response = roomMapper.toRoomResponse(room);
        return ApiResponse.<RoomResponse>builder()
                .result(response)
                .build();
    }

    @PutMapping
    public ApiResponse<RoomResponse> updateRoom(@RequestBody RoomUpdateRequest request,
                                                @RequestParam Long id) {
        Room room = roomService.updateRoom(request, id);
        RoomResponse response = roomMapper.toRoomResponse(room);
        return ApiResponse.<RoomResponse>builder()
                .result(response)
                .build();
    }

    @DeleteMapping
    public String deleteRoomById(@RequestParam Long id) {
        roomService.deleteById(id);
        return "Room has been deleted";
    }

    @PostMapping("upload-image")
    public ApiResponse<String> uploadImage(@RequestParam MultipartFile file,
                                           @RequestParam String fileName,
                                           @RequestParam Long id) {
        String result;
        try {
            Bucket bucket = StorageClient.getInstance().bucket();
            bucket.create(roomImagePath + fileName, file.getBytes(), file.getContentType());
            result = roomImagePath + fileName;
            RoomUpdateRequest request = new RoomUpdateRequest();
            request.setImagePath(result);
            roomService.updateRoom(request, id);

        } catch (Exception e) {
            e.printStackTrace();
            result = "Upload failed";
        }
        return ApiResponse.<String>builder()
                .result(result)
                .build();
    }


}
