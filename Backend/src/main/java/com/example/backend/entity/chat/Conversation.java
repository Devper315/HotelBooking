package com.example.backend.entity.chat;

import com.example.backend.entity.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne
    User user1;

    @ManyToOne
    User user2;

    @Transient
    User receiver;

    LocalDateTime createAt;
    LocalDateTime updateAt;

    public boolean containsUser(User user){
        return user.equals(user1) || user.equals(user2);
    }

}
