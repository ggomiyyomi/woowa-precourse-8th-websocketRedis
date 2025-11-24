package com.example.demo.service;

import com.example.demo.domain.ChatMessage;
import com.example.demo.mapper.ChatMessageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageMapper mapper;

    public Long sendMessage(String roomType, Long roomId,
                            Long userId, String messageType,
                            String content, String imageUrl) {

        ChatMessage msg = new ChatMessage();
        msg.setRoomType(roomType);
        msg.setRoomId(roomId);
        msg.setUserId(userId);
        msg.setMessageType(messageType);
        msg.setContent(content);
        msg.setImageUrl(imageUrl);

        mapper.insertMessage(msg);
        return msg.getCmId();
    }

    public List<ChatMessage> getMessages(String roomType, Long roomId) {
        return mapper.getMessagesByRoom(roomType, roomId);
    }
}
