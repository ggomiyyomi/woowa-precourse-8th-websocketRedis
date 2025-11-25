package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.domain.ChatMessage;
import com.example.demo.dto.ChatMessageRequest;
import com.example.demo.service.ChatMessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat/message")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;

    // 메시지 보내기
    @PostMapping("/send")
    public Long sendMessage(@RequestBody ChatMessageRequest req) {
        return chatMessageService.sendMessage(req);
    }

    // 메시지 히스토리 조회
    @GetMapping("/list")
    public List<ChatMessage> getMessages(
            @RequestParam("roomType") String roomType,
            @RequestParam("roomId") Long roomId,
            @RequestParam(value="afterId", required=false) Long afterId,
            @RequestParam(value="limit", defaultValue="50") int limit
    ) {
        return chatMessageService.getMessages(roomType, roomId, afterId, limit);
    }
}
