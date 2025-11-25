package com.example.demo.dto;

import lombok.Data;

@Data
public class ChatMessageRequest {
    private String roomType;   // "GROUP" or "PRIVATE"
    private Long roomId;       // gcrId or pcrId
    private Long userId;
    private String messageType; // TEXT, IMAGE, SYSTEM
    private String content;
    private String imageUrl;
}
