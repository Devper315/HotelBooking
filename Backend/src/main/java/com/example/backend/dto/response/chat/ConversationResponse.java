package com.example.backend.dto.response.chat;

import com.example.backend.entity.chat.Conversation;
import com.example.backend.entity.chat.MessageCustom;
import com.example.backend.entity.user.User;
import com.example.backend.utils.ChatUtils;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ConversationResponse {

    Long id;
    String sender;
    String recipient;

    public ConversationResponse(Conversation conversation, User requestor){
        this.id = conversation.getId();
        String email1 = conversation.getUser1().getEmail();
        String email2 = conversation.getUser2().getEmail();
        this.sender = requestor.getEmail().equals(email1) ? email1 : email2;
        this.recipient = requestor.getEmail().equals(email1) ? email2 : email1;
    }
}
