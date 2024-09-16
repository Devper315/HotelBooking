package com.example.backend.service.chat;

import com.example.backend.dto.request.chat.ConversationCreateRequest;
import com.example.backend.dto.response.chat.ConversationResponse;
import com.example.backend.entity.chat.Conversation;
import com.example.backend.entity.user.User;
import com.example.backend.repository.chat.ConversationRepo;
import com.example.backend.service.UserService;
import com.example.backend.utils.ChatUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ConversationService {
    ConversationRepo conversationRepo;
    UserService userService;

    public ConversationResponse createConversation(ConversationCreateRequest request){
        return createConversation(request.getUserId2());
    }

    public ConversationResponse createConversation(Long userId2){
        User user1 = userService.getCurrentUser();
        User user2 = userService.getById(userId2);
        Conversation newConversation = Conversation.builder()
                .user1(user1).user2(user2)
                .createAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .build();
        newConversation = conversationRepo.save(newConversation);
        return new ConversationResponse(newConversation, user1);
    }

    public List<ConversationResponse> getMyConversation(){
        User requestor = userService.getCurrentUser();
        List<Conversation> conversationList = conversationRepo.findByUser(requestor);
        return ChatUtils.convertConversationList(conversationList, requestor);
    }

    public Conversation getById(Long id){
        return conversationRepo.findById(id).orElse(null);
    }

    public ConversationResponse getBetweenUsers(Long userId2){
        User requestor = userService.getCurrentUser();
        Conversation conversation = conversationRepo.findBetweenUsers(requestor.getId(), userId2);
        if (conversation == null){
            return createConversation(userId2);
        }
        return new ConversationResponse(conversation, requestor);
    }
}
