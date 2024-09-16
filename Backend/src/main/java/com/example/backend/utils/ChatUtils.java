package com.example.backend.utils;

import com.example.backend.dto.response.chat.ConversationResponse;
import com.example.backend.dto.response.chat.MessageResponse;
import com.example.backend.entity.chat.Conversation;
import com.example.backend.entity.chat.MessageCustom;
import com.example.backend.entity.user.User;

import java.util.List;
import java.util.stream.Collectors;

public class ChatUtils {
    public static List<MessageResponse> convertMessageList(List<MessageCustom> messageList) {
        return messageList.stream()
                .map(MessageResponse::new)
                .collect(Collectors.toList());
    }

    public static List<ConversationResponse> convertConversationList(
            List<Conversation> conversationList, User requestor) {
        return conversationList.stream()
                .map(conversation -> new ConversationResponse(conversation, requestor))
                .collect(Collectors.toList());
    }
}
