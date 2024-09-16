package com.example.backend.controller.admin;

import com.example.backend.dto.request.hotel.RoomCreateRequest;
import com.example.backend.dto.request.hotel.RoomUpdateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.entity.hotel.Room;
import com.example.backend.model.RoomStatistical;
import com.example.backend.service.hotel.RoomService;
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
@RequestMapping("/api/hotel/admin/room")
public class ManageRoomController {

    @NonFinal
    @Value("${firebase.roomPath}")
    String roomImagePath;
    RoomService roomService;

    @GetMapping("/all")
    public ApiResponse<List<Room>> getAllRoom(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<Room> roomList = roomService.getAll(page, size);
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
    public ApiResponse<Room> createRoom(@RequestBody RoomCreateRequest request) {
        return ApiResponse.<Room>builder()
                .result(roomService.createRoom(request))
                .build();
    }

    @PutMapping
    public ApiResponse<Room> updateRoom(@RequestBody RoomUpdateRequest request,
                                                @RequestParam Long id) {
        return ApiResponse.<Room>builder()
                .result(roomService.updateRoom(request, id))
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

    @GetMapping("/statistical")
    public ApiResponse<RoomStatistical> getRoomStatistical(){
        return ApiResponse.<RoomStatistical>builder()
                .result(roomService.getRoomStatistical())
                .build();
    }

}
