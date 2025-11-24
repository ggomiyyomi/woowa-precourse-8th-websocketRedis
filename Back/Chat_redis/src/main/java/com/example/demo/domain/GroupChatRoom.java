package com.example.demo.domain;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class GroupChatRoom {
    private Long gcrId;
    private String roomTitle;
    private String roomDescription;
    private Integer maxUserCnt;
    private Boolean isDeleted;
    private LocalDateTime createdAt;
}