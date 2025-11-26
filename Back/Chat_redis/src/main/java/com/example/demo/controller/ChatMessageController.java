package com.example.demo.controller;

import java.util.List;

import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.domain.Range;   
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.ChatMessageRequest;
import com.example.demo.service.ChatMessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat/message")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final StringRedisTemplate redisTemplate;

    @PostMapping("/send")
    public Long sendMessage(@RequestBody ChatMessageRequest req) {
        return chatMessageService.sendMessage(req);
    }

    @GetMapping("/list")
    public List<MapRecord<String, Object, Object>> getMessages(
            @RequestParam("roomType") String roomType,
            @RequestParam("roomId") Long roomId,
            @RequestParam(value="start", defaultValue="0-0") String start,
            @RequestParam(value="end", defaultValue="+") String end
    ) {
        String key = "chat:" + roomType + ":" + roomId;

        return redisTemplate.opsForStream()
                .range(
                        key,
                        Range.closed(start, end)
                );
    }
}
