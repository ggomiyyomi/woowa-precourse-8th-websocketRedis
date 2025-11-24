package com.example.demo.domain;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatMessage {

    private Long cmId;
    private String roomType;   // GROUP or PRIVATE
    private Long roomId;
    private Long userId;
    private String messageType; // TEXT, IMAGE, SYSTEM ...
    private String content;
    private String imageUrl;
    private Boolean isDeleted;
    private LocalDateTime createdAt;
}
