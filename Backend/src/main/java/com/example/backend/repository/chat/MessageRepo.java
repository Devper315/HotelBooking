package com.example.backend.repository.chat;

import com.example.backend.entity.chat.Conversation;
import com.example.backend.entity.chat.MessageCustom;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<MessageCustom, Long> {
    List<MessageCustom> findByConversation(Conversation conversation, Sort sort);
}
