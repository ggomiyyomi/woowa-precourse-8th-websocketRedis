package com.example.demo.controller;

import com.example.demo.domain.User;
import com.example.demo.mapper.UserMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserTestController {

    private final UserMapper userMapper;

    public UserTestController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @GetMapping("/test/users")
    public List<User> testUsers() {
        return userMapper.findAllUsers();
    }
}
