package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.domain.GroupChatRoom;

@Mapper
public interface GroupChatRoomMapper {

    // 방 생성
    int createGroupRoom(GroupChatRoom room);

    // 방 상세 조회 (확인용)
    GroupChatRoom findById(Long gcrId);
}