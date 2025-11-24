package com.example.demo.domain;


import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ChatParticipant {
    private Long participantId;
    private String roomType;   // GROUP
    private Long roomId;       // gcr_id
    private Long userId;
    private Long lastReadMessageId;
    private LocalDateTime joinedAt;
}

