package com.example.backend.controller.admin;

import com.example.backend.dto.request.hotel.HotelCreateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.entity.hotel.Hotel;
import com.example.backend.service.hotel.HotelService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/admin/hotel")
public class ManageHotelController {
    @NonFinal
    @Value("${firebase.hotelPath}")
    String hotelImagePath;

    HotelService hotelService;

    @GetMapping("/all")
    public ApiResponse<List<Hotel>> getAllHotel(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        List<Hotel> hotelList = hotelService.getAll(page, size);
        return ApiResponse.<List<Hotel>>builder()
                .result(hotelList)
                .build();
    }

    @GetMapping
    public ApiResponse<Hotel> getHotelById(@RequestParam Long id) {
        Hotel hotel = hotelService.getById(id);
        return ApiResponse.<Hotel>builder()
                .result(hotel)
                .build();
    }

    @PostMapping()
    public ApiResponse<Hotel> createHotel(@RequestBody HotelCreateRequest request){
        return ApiResponse.<Hotel>builder()
                .result(hotelService.createHotel(request))
                .build();
    }

    @DeleteMapping
    public String deleteHotelById(@RequestParam Long id){
        hotelService.deleteById(id);
        return "Hotel has been delete";
    }
}
