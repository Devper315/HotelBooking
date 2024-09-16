package com.example.backend.repository.chat;

import com.example.backend.entity.chat.Conversation;
import com.example.backend.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepo extends JpaRepository<Conversation, Long> {
    List<Conversation> findByUser1OrUser2(User user1, User user2);
}
