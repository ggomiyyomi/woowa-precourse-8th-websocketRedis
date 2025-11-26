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
    private final RedisSubscriber redisSubscriber;

    public String publish(String streamKey, Map<String, String> messageData) {

        // 메시지 저장
        RecordId id = redisTemplate.opsForStream()
            .add(StreamRecords.newRecord()
            .in(streamKey)
            .ofMap(messageData));

        // 🔥 stream listener 등록
        redisSubscriber.subscribeStream(streamKey);

        return id.getValue();
    }

}
