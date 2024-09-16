package com.example.backend.dto.request.chat;

import com.example.backend.entity.chat.MessageStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MessageCreateRequest {
    String sender;
    String recipient;
    Long conversationId;
    String content;
}
