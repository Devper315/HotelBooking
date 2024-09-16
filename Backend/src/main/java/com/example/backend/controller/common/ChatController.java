package com.example.backend.controller.common;

import com.example.backend.dto.request.chat.MessageCreateRequest;
import com.example.backend.dto.response.MessageResponse;
import com.example.backend.entity.chat.Conversation;
import com.example.backend.entity.chat.Message;
import com.example.backend.service.chat.ConversationService;
import com.example.backend.service.chat.MessageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatController {
    ConversationService conversationService;
    MessageService messageService;

//    @MessageMapping("/chat/message")
//    @SendTo("/topic/messages")
//    public MessageResponse sendMessage(MessageCreateRequest request){
//        Message newMessage = messageService.createMessage(request);
//        return new MessageResponse(newMessage);
//    }
    @MessageMapping("/chat/message")
    @SendTo("/topic/messages")
    public String sendMessage(String message){
        return message;
    }
}
