package com.example.demo.controller;

import com.example.demo.domain.ChatMessage;
import com.example.demo.dto.ChatMessageRequest;
import com.example.demo.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompChatController {

    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    // 클라이언트에서 /app/chat.send 로 메시지 발행
    @MessageMapping("/chat.send")
    public void send(ChatMessageRequest req) {

        // 1) DB 저장
        Long savedId = chatMessageService.sendMessage(req);
        ChatMessage saved = chatMessageService.getById(savedId);

        // 2) 구독자들에게 브로드캐스트
        String destination = "/topic/chat/" + req.getRoomType() + "/" + req.getRoomId();
        messagingTemplate.convertAndSend(destination, saved);
    }
}
