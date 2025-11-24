package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.domain.GroupChatRoom;
import com.example.demo.mapper.GroupChatRoomMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GroupChatRoomService {

    private final GroupChatRoomMapper mapper;

    public Long createRoom(String title, String description, Integer maxUserCnt) {
        GroupChatRoom room = new GroupChatRoom();
        room.setRoomTitle(title);
        room.setRoomDescription(description);
        room.setMaxUserCnt(maxUserCnt);

        mapper.createGroupRoom(room);
        return room.getGcrId();
    }

    public GroupChatRoom getRoom(Long gcrId) {
        return mapper.findById(gcrId);
    }
}