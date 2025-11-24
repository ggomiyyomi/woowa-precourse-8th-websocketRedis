package com.example.demo.domain;

import lombok.Data;

@Data
public class User {
    private Long userId;
    private String userName;
    private String userNickname;
    private String userProfileUrl;
    private String createdAt;
}    