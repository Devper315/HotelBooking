package com.example.backend.service.chat;

import com.example.backend.dto.request.chat.MessageCreateRequest;
import com.example.backend.dto.response.chat.MessageResponse;
import com.example.backend.entity.chat.Conversation;
import com.example.backend.entity.chat.MessageCustom;
import com.example.backend.entity.chat.MessageStatus;
import com.example.backend.repository.chat.MessageRepo;
import com.example.backend.service.UserService;
import com.example.backend.utils.DateUtils;
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
    public MessageCustom createMessage(MessageCreateRequest request){
        Conversation conversation = conversationService.getById(request.getConversationId());
        MessageCustom newMessageCustom = new MessageCustom();
        newMessageCustom.setContent(request.getContent());
        newMessageCustom.setSender(userService.getByEmail(request.getSender()));
        newMessageCustom.setStatus(MessageStatus.SENT);
        LocalDateTime currentTime = LocalDateTime.now();
        newMessageCustom.setTime(currentTime);
        conversation.setUpdateAt(currentTime);
        newMessageCustom.setConversation(conversation);
        return messageRepo.save(newMessageCustom);
    }

    public List<MessageCustom> getByConversationId(Long conversationId){
        Conversation conversation = conversationService.getById(conversationId);
        if (!conversation.containsUser(userService.getCurrentUser()))
            throw new RuntimeException("Id cuộc trò chuyện không hợp lệ");
        Sort sort = Sort.by("time");
        return messageRepo.findByConversation(conversation, sort);
    }
}
