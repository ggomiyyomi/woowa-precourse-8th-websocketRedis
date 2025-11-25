package com.example.demo.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.example.demo.domain.ChatMessage;

@Mapper
public interface ChatMessageMapper {

    int insertMessage(ChatMessage message);

    List<ChatMessage> findMessages(
            @Param("roomType") String roomType,
            @Param("roomId") Long roomId,
            @Param("afterId") Long afterId,   // 0이면 전체
            @Param("limit") int limit
    );
}
