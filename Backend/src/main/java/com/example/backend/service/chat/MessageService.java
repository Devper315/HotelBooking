package com.example.backend.service.chat;

import com.example.backend.dto.request.chat.MessageCreateRequest;
import com.example.backend.dto.response.MessageResponse;
import com.example.backend.entity.chat.Conversation;
import com.example.backend.entity.chat.Message;
import com.example.backend.entity.chat.MessageStatus;
import com.example.backend.repository.chat.MessageRepo;
import com.example.backend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MessageService {
    MessageRepo messageRepo;
    ConversationService conversationService;
    UserService userService;
    public Message createMessage(MessageCreateRequest request){
        Conversation conversation = conversationService.getById(request.getConversationId());
        Message newMessage = new Message();
        newMessage.setContent(request.getContent());
        newMessage.setSender(userService.getCurrentUser());
        newMessage.setStatus(MessageStatus.SENT);
        LocalDateTime currentTime = LocalDateTime.now();
        newMessage.setTime(currentTime);
        conversation.setUpdateAt(currentTime);
        newMessage.setConversation(conversation);
        return messageRepo.save(newMessage);
    }

    public List<MessageResponse> getByConversationId(Long conversationId){
        Conversation conversation = conversationService.getById(conversationId);
        if (!conversation.containsUser(userService.getCurrentUser()))
            throw new RuntimeException("Id cuộc trò chuyện không hợp lệ");
        Sort sort = Sort.by("time");
        List<Message> messageList = messageRepo.findByConversation(conversation, sort);
        return messageList.stream()
                .map(MessageResponse::new)
                .collect(Collectors.toList());
    }
}
