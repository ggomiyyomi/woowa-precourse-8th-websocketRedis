package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.domain.GroupChatRoom;
import com.example.demo.mapper.ChatParticipantMapper;
import com.example.demo.mapper.GroupChatRoomMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupChatRoomService {

    private final GroupChatRoomMapper mapper;
    private final ChatParticipantMapper participantMapper;

    public Long createRoom(String title, String description, Integer maxUserCnt, Long userId) {
        GroupChatRoom room = new GroupChatRoom();
        room.setRoomTitle(title);
        room.setRoomDescription(description);
        room.setMaxUserCnt(maxUserCnt);
        // 🔥 방장 자동 설정
        room.setOwnerUserId(userId);
        mapper.createGroupRoom(room);
        return room.getGcrId();
    }


    public GroupChatRoom getRoom(Long gcrId) {
        return mapper.findById(gcrId);
    }
    
    public List<GroupChatRoom> getRoomList() {
        return mapper.findAll();
    }
    
    public String updateRoom(Long gcrId, Long userId, String newTitle, String newDesc, Integer newMaxUserCnt) {

        GroupChatRoom room = mapper.findById(gcrId);
        if (room == null) {
            return "방을 찾을 수 없습니다.";
        }

        // 🔥 방장 체크
        if (!room.getOwnerUserId().equals(userId)) {
            return "방장만 방을 수정할 수 있습니다.";
        }

        // 현재 참여자 수
        int currentParticipants = participantMapper.countParticipantsInRoom(gcrId);

        // 🔥 현재 인원보다 작은 정원으로 수정 불가
        if (newMaxUserCnt < currentParticipants) {
            return "현재 참여자 수보다 작은 정원으로 수정할 수 없습니다.";
        }

        // 🔥 업데이트 실행
        room.setRoomTitle(newTitle);
        room.setRoomDescription(newDesc);
        room.setMaxUserCnt(newMaxUserCnt);

        mapper.updateRoom(room);

        return "수정 완료";
    }
    
    public String deleteRoom(Long gcrId, Long userId) {
        GroupChatRoom room = mapper.findById(gcrId);

        if (room == null) {
            return "방을 찾을 수 없습니다.";
        }

        if (!room.getOwnerUserId().equals(userId)) {
            return "방장만 방을 삭제할 수 있습니다.";
        }

        mapper.deleteRoom(gcrId);
        return "삭제 완료";
    }
}