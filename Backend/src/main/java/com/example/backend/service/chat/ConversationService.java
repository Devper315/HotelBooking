package com.example.backend.service.chat;

import com.example.backend.dto.request.chat.ConversationCreateRequest;
import com.example.backend.entity.chat.Conversation;
import com.example.backend.entity.user.User;
import com.example.backend.repository.chat.ConversationRepo;
import com.example.backend.service.UserService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ConversationService {
    ConversationRepo conversationRepo;
    UserService userService;

    public Conversation createConversation(){
        User user1 = userService.getCurrentUser();
        User user2 = userService.getAdminOnline();
        Conversation newConversation = Conversation.builder()
                .user1(user1).user2(user2).createAt(LocalDateTime.now())
                .build();
        return conversationRepo.save(newConversation);
    }

    public Conversation createConversation(ConversationCreateRequest request){
        User user1 = userService.getCurrentUser();
        User user2 = userService.getById(request.getUserId2());
        Conversation newConversation = Conversation.builder()
                .user1(user1).user2(user2)
                .createAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .build();
        return conversationRepo.save(newConversation);
    }

    public Conversation getById(Long id){
        return conversationRepo.findById(id).orElse(null);
    }
}
