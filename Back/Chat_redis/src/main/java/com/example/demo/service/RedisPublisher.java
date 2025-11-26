package com.example.demo.service;

import java.util.Map;

import org.springframework.data.redis.connection.stream.RecordId;
import org.springframework.data.redis.connection.stream.StreamRecords;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RedisPublisher {

    private final StringRedisTemplate redisTemplate;

    public String publish(String streamKey, Map<String, String> messageData) {

        RecordId id = redisTemplate.opsForStream()
                .add(StreamRecords.newRecord()
                        .in(streamKey)
                        .ofMap(messageData));

        return id.getValue();  // 메시지 ID 반환
    }
}
