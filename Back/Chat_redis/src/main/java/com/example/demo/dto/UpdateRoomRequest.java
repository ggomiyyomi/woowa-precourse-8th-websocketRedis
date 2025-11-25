package com.example.demo.dto;

import lombok.Data;

@Data
public class UpdateRoomRequest {
    private Long gcrId;
    private Long userId;
    private String title;
    private String description;
    private Integer maxUserCnt;
}
