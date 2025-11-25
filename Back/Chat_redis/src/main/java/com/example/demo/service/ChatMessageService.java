package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.domain.ChatMessage;
import com.example.demo.dto.ChatMessageRequest;
import com.example.demo.mapper.ChatMessageMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageMapper chatMessageMapper;

    @Transactional
    public Long sendMessage(ChatMessageRequest req) {
        ChatMessage msg = new ChatMessage();
        msg.setRoomType(req.getRoomType());
        msg.setRoomId(req.getRoomId());
        msg.setUserId(req.getUserId());
        msg.setMessageType(req.getMessageType() == null ? "TEXT" : req.getMessageType());
        msg.setContent(req.getContent());
        msg.setImageUrl(req.getImageUrl());

        chatMessageMapper.insertMessage(msg);
        return msg.getCmId();
    }

    public List<ChatMessage> getMessages(String roomType, Long roomId, Long afterId, int limit) {
        if (afterId == null) afterId = 0L;
        if (limit <= 0) limit = 50;

        return chatMessageMapper.findMessages(roomType, roomId, afterId, limit);
    }
    
    public ChatMessage getById(Long cmId) {
        return chatMessageMapper.findById(cmId);
    }
}
