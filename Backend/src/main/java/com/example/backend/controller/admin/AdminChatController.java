package com.example.backend.controller.admin;

import com.example.backend.dto.request.chat.ConversationCreateRequest;
import com.example.backend.dto.request.chat.MessageCreateRequest;
import com.example.backend.dto.response.ApiResponse;
import com.example.backend.dto.response.MessageResponse;
import com.example.backend.entity.chat.Conversation;
import com.example.backend.entity.chat.Message;
import com.example.backend.service.chat.ConversationService;
import com.example.backend.service.chat.MessageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/hotel/admin/chat")
public class AdminChatController {

    ConversationService conversationService;
    MessageService messageService;

    @PostMapping
    public ApiResponse<Conversation> createConversation(
            @RequestBody ConversationCreateRequest request){
        return ApiResponse.<Conversation>builder()
                .result(conversationService.createConversation(request))
                .build();
    }

    @PostMapping("/message")
    public ApiResponse<String> createMessage(
            @RequestBody MessageCreateRequest request){
        return ApiResponse.<String>builder()
                .result(messageService.createMessage(request).getContent())
                .build();
    }

    @GetMapping("/message")
    public ApiResponse<List<MessageResponse>> getMessage(@RequestParam Long conversationId){
        return ApiResponse.<List<MessageResponse>>builder()
                .result(messageService.getByConversationId(conversationId))
                .build();
    }
}
