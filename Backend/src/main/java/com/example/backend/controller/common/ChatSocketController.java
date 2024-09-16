package com.example.backend.controller.common;


import com.example.backend.dto.request.chat.MessageCreateRequest;
import com.example.backend.service.chat.MessageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatSocketController {
    MessageService messageService;
    SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/message")
    @SendTo("/topic/messages")
    public String sendMessage(String message) {
        return message;
    }

    @MessageMapping("/private/send")
    public void send(MessageCreateRequest request) {
        messageService.createMessage(request);
        messagingTemplate.convertAndSendToUser(
                request.getRecipient(),
                "/private/reply",
                request);
    }


}
