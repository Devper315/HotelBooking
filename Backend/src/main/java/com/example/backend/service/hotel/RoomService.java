package com.example.backend.service.hotel;

import com.example.backend.dto.request.hotel.RoomCreateRequest;
import com.example.backend.dto.request.hotel.RoomUpdateRequest;
import com.example.backend.entity.hotel.Room;
import com.example.backend.entity.hotel.RoomStatus;
import com.example.backend.entity.hotel.RoomType;
import com.example.backend.mapper.RoomMapper;
import com.example.backend.model.RoomStatistical;
import com.example.backend.repository.hotel.RoomRepo;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomService {

    RoomRepo roomRepo;
    RoomTypeService roomTypeService;
    RoomMapper roomMapper;

    public List<Room> getAll(int page, int size){
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(page, size, sort);
        return roomRepo.findAll(pageable).getContent();
    }

    public Room getById(Long id){
        return roomRepo.findById(id).orElse(null);
    }

    public Room createRoom(RoomCreateRequest request){
        Room room = roomMapper.toRoom(request);
        RoomType roomType = roomTypeService.getByName(request.getRoomType());
        room.setType(roomType);
        room.setStatus(RoomStatus.AVAILABLE);
        return roomRepo.save(room);
    }

    public Room updateRoom(RoomUpdateRequest request, Long id){
        Room room = roomRepo.findById(id).get();
        if (request.getImagePath() != null)
            room.setImagePath(request.getImagePath());
        else{
            room.setPrice(request.getPrice());
            room.setType(roomTypeService.getByName(request.getType()));
        }
        return roomRepo.save(room);
    }

    public void deleteById(Long id){
        roomRepo.deleteById(id);
    }

    public RoomStatistical getRoomStatistical(){
        return roomRepo.getRoomStatistical();
    }
}
