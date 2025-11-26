package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import com.example.demo.dto.ChatMessageRequest;
import com.example.demo.service.RedisPublisher;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class StompChatController {

    private final RedisPublisher redisPublisher;

    @MessageMapping("/chat.send")
    public void send(ChatMessageRequest req) {

        String streamKey = "chat:" + req.getRoomType() + ":" + req.getRoomId();

        Map<String, String> msg = new HashMap<>();
        msg.put("roomType", req.getRoomType());
        msg.put("roomId", req.getRoomId().toString());
        msg.put("userId", req.getUserId().toString());
        msg.put("content", req.getContent());
        msg.put("createdAt", String.valueOf(System.currentTimeMillis()));

        redisPublisher.publish(streamKey, msg);
    }
     
}
