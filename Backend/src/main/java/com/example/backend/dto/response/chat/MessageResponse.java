package com.example.backend.dto.response.chat;

import com.example.backend.entity.chat.MessageCustom;
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
    String sender;
    String content;
    String time;
    MessageStatus status;

    public MessageResponse(MessageCustom messageCustom) {
        this.id = messageCustom.getId();
        this.conversationId = messageCustom.getConversation().getId();
        this.sender = messageCustom.getSender().getEmail();
        this.content = messageCustom.getContent();
        this.time = DateUtils.reFormatDateTime(messageCustom.getTime());
        this.status = messageCustom.getStatus();
    }
}
