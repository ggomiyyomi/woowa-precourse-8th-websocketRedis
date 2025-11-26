package com.example.demo.service;

import java.util.Map;

import org.springframework.data.redis.connection.stream.Consumer;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.stream.StreamMessageListenerContainer;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import jakarta.annotation.PostConstruct;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisSubscriber {

    private final SimpMessagingTemplate messagingTemplate;
    private final StreamMessageListenerContainer<String, ?> container;

    @PostConstruct
    public void subscribe() {

        // Stream 패턴 (GROUP 채팅)
        String keyPattern = "chat:GROUP:*";

        container.receive(
                Consumer.from("chat-consumer-group", "c1"),
                StreamOffset.fromStart(keyPattern),
                message -> {

                    MapRecord<String, String, String> record =
                            (MapRecord<String, String, String>) message;

                    String streamKey = record.getStream();  // chat:GROUP:5
                    Map<String, String> body = record.getValue();
                    String[] parts = streamKey.split(":");
                    String roomId = parts[2];

                    log.info("📥 Redis Stream → STOMP 전송: {}", body);

                    messagingTemplate.convertAndSend(
                            "/topic/chat/GROUP/" + roomId,
                            body
                    );
                }
        );

        container.start();
        log.info("🚀 Redis Stream Listener Started");
    }
}
