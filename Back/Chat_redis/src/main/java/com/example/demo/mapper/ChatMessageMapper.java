package com.example.demo.mapper;

import com.example.demo.domain.ChatMessage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ChatMessageMapper {

    int insertMessage(ChatMessage message);

    List<ChatMessage> getMessagesByRoom(@Param("roomType") String roomType, 
    		@Param("roomId") Long roomId);

}
