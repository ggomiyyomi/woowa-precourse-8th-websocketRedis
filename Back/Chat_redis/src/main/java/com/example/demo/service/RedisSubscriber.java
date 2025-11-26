package com.example.demo.service;

import java.util.Map;
import java.util.Set;

import org.springframework.data.redis.connection.stream.Consumer;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.connection.stream.ReadOffset;
import org.springframework.data.redis.connection.stream.StreamOffset;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.stream.StreamMessageListenerContainer;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class RedisSubscriber {

	private final SimpMessagingTemplate messagingTemplate;
	private final StreamMessageListenerContainer<String, ?> container;
	private final StringRedisTemplate redisTemplate;

	private static final String GROUP = "chat-consumer-group";

	@PostConstruct
	public void subscribe() {

		Set<String> keys = redisTemplate.keys("chat:GROUP:*");
		for (String key : keys) {

			try {
				redisTemplate.opsForStream().createGroup(key, GROUP);
				log.info("✔ Created consumer group '{}' for stream {}", GROUP, key);
			} catch (Exception e) {
				log.info("ℹ Group already exists for stream {}", key);
			}

			container.receive(Consumer.from(GROUP, "c1"), StreamOffset.create(key, ReadOffset.lastConsumed()),
					message -> {

						MapRecord<String, String, String> record = (MapRecord<String, String, String>) message;

						String streamKey = record.getStream(); // chat:GROUP:1
						Map<String, String> body = record.getValue();

						String[] parts = streamKey.split(":");
						String roomId = parts[2];

						log.info("📥 Redis Stream → STOMP 전송: {}", body);

						messagingTemplate.convertAndSend("/topic/chat/GROUP/" + roomId, body);
					});
		}

		container.start();
		log.info("🚀 Redis Stream Listener Started");
	}

	public void subscribeStream(String streamKey) {
		try {
			redisTemplate.opsForStream().createGroup(streamKey, GROUP);
		} catch (Exception e) {
		}
		container.receive(Consumer.from(GROUP, "c1"), StreamOffset.create(streamKey, ReadOffset.lastConsumed()),
				message -> {
					MapRecord<String, String, String> record = (MapRecord) message;
					String[] parts = record.getStream().split(":");
					String roomId = parts[2];
					messagingTemplate.convertAndSend("/topic/chat/GROUP/" + roomId, record.getValue());
				});
	}
}