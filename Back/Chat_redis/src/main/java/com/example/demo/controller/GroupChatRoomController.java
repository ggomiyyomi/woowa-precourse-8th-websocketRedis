package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.ChatParticipant;
import com.example.demo.domain.GroupChatRoom;
import com.example.demo.service.ChatParticipantService;
import com.example.demo.service.GroupChatRoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chat/group")
@RequiredArgsConstructor
public class GroupChatRoomController {

    private final GroupChatRoomService service;
    private final ChatParticipantService participantService;
    
    @PostMapping("/create")
    public Long createRoom(
            @RequestParam(name = "title") String title,
            @RequestParam(name = "description", required = false) String description,
            @RequestParam(name = "maxUserCnt", defaultValue = "50") Integer maxUserCnt
    ) {
        return service.createRoom(title, description, maxUserCnt);
    }
    
    @GetMapping("/{gcrId}")
    public GroupChatRoom getRoom(@PathVariable("gcrId") Long gcrId) {
        return service.getRoom(gcrId);
    }
    
    @PostMapping("/join")
    public String joinGroupRoom(
            @RequestParam("gcrId") Long gcrId,
            @RequestParam("userId") Long userId
    ) {
        return participantService.joinGroupRoom(gcrId, userId);
    }
    
    @GetMapping("/list")
    public List<GroupChatRoom> getRoomList() {
        return service.getRoomList();
    }
    
    @GetMapping("/{gcrId}/participants")
    public List<ChatParticipant> getParticipants(@PathVariable("gcrId") Long gcrId) {
        return participantService.getParticipants(gcrId);
    }

}