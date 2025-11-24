package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.ChatMessage;
import com.example.demo.service.ChatMessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chat/message")
@RequiredArgsConstructor
public class ChatMessageController {

    private final ChatMessageService service;

    @PostMapping("/send")
    public Long sendMessage(
            @RequestParam("roomType") String roomType,
            @RequestParam("roomId") Long roomId,
            @RequestParam("userId") Long userId,
            @RequestParam("content") String content,
            @RequestParam(name = "messageType", defaultValue = "TEXT") String messageType,
            @RequestParam(name = "imageUrl", required = false) String imageUrl
    ) {
        return service.sendMessage(roomType, roomId, userId, messageType, content, imageUrl);
    }

    @GetMapping("/list")
    public List<ChatMessage> getMessages(
            @RequestParam("roomType") String roomType,
            @RequestParam("roomId") Long roomId
    ) {
        return service.getMessages(roomType, roomId);
    }
}
