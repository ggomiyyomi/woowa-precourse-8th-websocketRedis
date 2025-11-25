package com.example.demo.dto;

import lombok.Data;

@Data
public class ChatMessageRequest {

    private String roomType;   // GROUP or PRIVATE
    private Long roomId;
    private Long userId;
    private String messageType; // TEXT, IMAGE
    private String content;
    private String imageUrl;
}
