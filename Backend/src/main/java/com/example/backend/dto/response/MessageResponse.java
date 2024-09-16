package com.example.backend.dto.response;

import com.example.backend.entity.chat.Message;
import com.example.backend.entity.chat.MessageStatus;
import com.example.backend.utils.DateUtils;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MessageResponse {
    Long id;
    Long conversationId;
    Long senderId;
    String content;
    String time;
    MessageStatus status;

    public MessageResponse(Message message) {
        this.id = message.getId();
        this.conversationId = message.getConversation().getId();
        this.senderId = message.getSender().getId();
        this.content = message.getContent();
        this.time = DateUtils.reFormatDateTime(message.getTime());
        this.status = message.getStatus();
    }
}
