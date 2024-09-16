package com.example.backend.controller.common;

import com.example.backend.dto.request.chat.ConversationCreateRequest;
import com.example.backend.dto.request.chat.MessageCreateRequest;
import com.example.backend.dto.request.user.UserCreateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.chat.ConversationResponse;
import com.example.backend.dto.response.chat.MessageResponse;
import com.example.backend.dto.response.user.UserResponse;
import com.example.backend.entity.chat.Conversation;
import com.example.backend.entity.chat.MessageCustom;
import com.example.backend.entity.hotel.Room;
import com.example.backend.entity.user.User;
import com.example.backend.mapper.UserMapper;
import com.example.backend.service.UserService;
import com.example.backend.service.chat.ConversationService;
import com.example.backend.service.chat.MessageService;
import com.example.backend.service.hotel.RoomService;
import com.example.backend.utils.ChatUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api")
public class CommonController {
    RoomService roomService;
    UserService userService;
    UserMapper userMapper;
    ConversationService conversationService;
    MessageService messageService;


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

    @GetMapping("/chat/conversation")
    public ApiResponse<ConversationResponse> getMyConversation(@RequestParam Long userId2){
        ConversationResponse response = conversationService.getBetweenUsers(userId2);
        return ApiResponse.<ConversationResponse>builder()
                .result(response)
                .build();
    }

    @PostMapping("/chat/conversation")
    public ApiResponse<ConversationResponse> createConversation(@RequestBody ConversationCreateRequest request) {
        return ApiResponse.<ConversationResponse>builder()
                .result(conversationService.createConversation(request))
                .build();
    }

    @GetMapping("/chat/message")
    public ApiResponse<List<MessageResponse>> getMessageByConversationId(@RequestParam Long conversationId) {
        List<MessageCustom> messageList = messageService.getByConversationId(conversationId);
        return ApiResponse.<List<MessageResponse>>builder()
                .result(ChatUtils.convertMessageList(messageList))
                .build();
    }

    @PostMapping("/chat/message")
    public ApiResponse<String> createMessage(@RequestBody MessageCreateRequest request) {
        return ApiResponse.<String>builder()
                .result(messageService.createMessage(request).getContent())
                .build();
    }



}
