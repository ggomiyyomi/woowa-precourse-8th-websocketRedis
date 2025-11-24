package com.example.demo.service;

import com.example.demo.domain.ChatParticipant;
import com.example.demo.domain.GroupChatRoom;
import com.example.demo.mapper.ChatParticipantMapper;
import com.example.demo.mapper.GroupChatRoomMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatParticipantService {

    private final ChatParticipantMapper participantMapper;
    private final GroupChatRoomMapper groupChatRoomMapper;

    public String joinGroupRoom(Long gcrId, Long userId) {

        GroupChatRoom room = groupChatRoomMapper.findById(gcrId);
        if (room == null) {
            return "채팅방을 찾을 수 없습니다.";
        }

        // 현재 참여자 수
        int current = participantMapper.countParticipantsInRoom(gcrId);

        // 방 최대 인원
        int maxCnt = room.getMaxUserCnt();

        if (current >= maxCnt) {
            return "방 인원이 가득 찼습니다.";
        }

        // 중복 참여 체크
        int exists = participantMapper.existsUserInRoom(gcrId, userId);
        if (exists > 0) {
            return "이미 참여 중입니다.";
        }

        // 참여 insert
        ChatParticipant participant = new ChatParticipant();
        participant.setRoomType("GROUP");
        participant.setRoomId(gcrId);
        participant.setUserId(userId);

        participantMapper.insertParticipant(participant);

        return "참여 완료";
    }
}
