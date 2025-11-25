package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.example.demo.domain.ChatParticipant;

@Mapper
public interface ChatParticipantMapper {

    int insertParticipant(ChatParticipant participant);

    int countParticipantsInRoom(@Param("gcrId") Long gcrId);

    int existsUserInRoom(@Param("gcrId") Long gcrId,
                         @Param("userId") Long userId);

    List<ChatParticipant> getParticipants(@Param("gcrId") Long gcrId);
    
    // 방 나가기
    int leaveRoom(@Param("gcrId") Long gcrId, @Param("userId") Long userId);
}
