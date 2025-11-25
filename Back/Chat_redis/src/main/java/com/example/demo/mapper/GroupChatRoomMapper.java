package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.domain.GroupChatRoom;

@Mapper
public interface GroupChatRoomMapper {

    // 방 생성
    int createGroupRoom(GroupChatRoom room);

    // 방 상세 조회 (확인용)
    GroupChatRoom findById(Long gcrId);
    
    // 방 목록 조회 
    List<GroupChatRoom> findAll();
    
    // 방 수정 
    int updateRoom(GroupChatRoom room);
    
    // 방 삭제 
    int deleteRoom(Long gcrId);
}