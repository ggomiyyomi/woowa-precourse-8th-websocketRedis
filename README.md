# 📡 Real-Time Group Chat System

### (Redis Streams + WebSocket + Spring Boot + React)

---

## 📝 소개

이 프로젝트는 **Redis Streams + WebSocket(STOMP)** 기반으로 만든  
고성능 **실시간 그룹 채팅 시스템**입니다.

Redis Stream으로 메시지를 처리하여 빠르고 안정적이며,  
카카오톡과 비슷한 UX(스크롤 동작, 새 메시지 미리보기 등)를 제공합니다.

또한, **참여자만 메시지 및 참여자 목록을 볼 수 있는 접근 제한 기능**이 포함되어 있습니다.

---

## 🚀 주요 기능

### 🔥 실시간 메시징

- Redis Streams → Listener → STOMP Topic 실시간 전송
- 메시지 순서 보장
- 여러 브라우저 간 메시지 동기화

### 🧑‍🤝‍🧑 그룹 채팅 기능

- **채팅방 생성 / 수정 / 삭제**
- **방장(Owner) 표시 👑**
- 참여 / 나가기 기능
- 참여자 목록 및 참여 시간 표시
- **참여자가 아니면 메시지 내용을 볼 수 없음**

### ✉️ 채팅 UX

- 카카오톡처럼 **새 메시지 미리보기 알림** 표시
- 자동 스크롤
- 사용자가 스크롤 올리면 자동스크롤 중지
- 날짜별 메시지 구분 표시

### 🔒 접근 제한 기능

- 참여자가 아닐 경우:
  - 메시지 리스트 비활성화
  - 채팅 입력창 비활성화
  - 참여자 목록 숨김

---

## 🏛 시스템 구조

```
React (STOMP Client)
│
▼
Spring Boot (STOMP Controller)
│
▼
Redis Streams (Message Queue)
│
▼
Redis Stream Listener (Consumer Group)
│
▼
STOMP Topic → Frontend 실시간 반영
```

---

## 🛠 기술 스택

### Backend

- Java 17
- Spring Boot 3.5.x
- Redis Streams
- STOMP WebSocket
- MyBatis
- MySQL

### Frontend

- React (Vite)
- TailwindCSS
- STOMP.js

---

## 🧩 향후 추가 예정 기능

- 파일 / 이미지 업로드
- 메시지 삭제 / 수정 기능
- 읽음 표시 기능
- Redis Stream Retention 정책 적용
- 1:1 DM 채팅

---

## 👩‍💻 개발자

- Heejeong Seo (서희정)
  Spring Boot + Redis 기반 실시간 시스템 개발
  전체 Frontend · Backend 구현

---

## 👩 회고

websocket을 공부하면서 redis외에도 여럿 브로커들이 있다는 것을 알게 되었고, 각각의 차이점을 알 수 있었다. 그리고, 학습 하면서 websocket은 더 깊게 해야함을 느끼게 되었다.
이 채팅플랫폼을 진행하면서 SQLD 시험을 보았는데, 이 시험이 오픈미션 기간내에 결과가 나오지 않아 아쉽지만 이 학습과 결과물을 낼 수 있게 되어 다행인것 같다. 첫 시도 후에 git연동하여 진행한 것이라 기간내에 업로드는 못했지만 제출에 있어 의미를 두고있다.
