import ParticipantList from "./ParticipantList";
import RoomEditor from "./RoomEditor";
import ChatWindow from "../chat/ChatWindow";  

export default function RoomDetail({
  selectedRoomInfo,
  participants,

  // 상태
  isOwner,
  isJoined,
  isFull,
  isEditing,

  // 수정 상태
  editTitle,
  editDesc,
  editMax,

  // 이벤트 핸들러들
  onToggleEdit,
  onUpdateRoom,
  onDeleteRoom,
  onJoin,
  onLeave,
  
  // setState handlers
  setEditTitle,
  setEditDesc,
  setEditMax,

  // 메시지 (서버 응답)
  message,

  // 🎯 채팅 props
  chatMessages,
  chatInput,
  setChatInput,
  handleSendMessage,
  userId,
}) {
  return (
    <div
      style={{
        marginTop: 30,
        padding: 15,
        border: "2px solid black",
        borderRadius: 10
      }}
    >
      <h3>방 상세 정보</h3>
      <p>방 제목: {selectedRoomInfo.roomTitle}</p>
      <p>설명: {selectedRoomInfo.roomDescription}</p>
      <p>
        인원: {participants.length} / {selectedRoomInfo.maxUserCnt}
      </p>

      {isOwner && (
        <button
          onClick={onToggleEdit}
          style={{
            background: "#ff9800",
            color: "white",
            padding: "8px 15px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            marginTop: 10
          }}
        >
          {isEditing ? "수정 취소" : "방 수정하기"}
        </button>
      )}

      {/* 수정 화면 */}
      {isOwner && isEditing && (
        <RoomEditor
          editTitle={editTitle}
          editDesc={editDesc}
          editMax={editMax}
          setEditTitle={setEditTitle}
          setEditDesc={setEditDesc}
          setEditMax={setEditMax}
          participantsCount={participants.length}
          onUpdateRoom={onUpdateRoom}
        />
      )}

      {/* 방 삭제 */}
      {isOwner && (
        <button
          onClick={onDeleteRoom}
          style={{
            background: "black",
            color: "white",
            padding: "8px 15px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            marginTop: 15
          }}
        >
          방 삭제
        </button>
      )}

      {/* 참여/나가기 */}
      {!isOwner && !isJoined && !isFull && (
        <button
          onClick={onJoin}
          style={{
            background: "#007bff",
            color: "white",
            padding: "8px 15px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            marginTop: 10
          }}
        >
          참여하기
        </button>
      )}

      {!isOwner && isJoined && (
        <button
          onClick={onLeave}
          style={{
            background: "red",
            color: "white",
            padding: "8px 15px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
            marginTop: 10
          }}
        >
          나가기
        </button>
      )}

      {isJoined && <p>✔ 이미 참여한 사용자입니다.</p>}
      {isFull && <p>❌ 방 인원이 가득 찼습니다.</p>}
      {message && <p style={{ marginTop: 10 }}>서버 응답: {message}</p>}

      <ParticipantList participants={participants} />
 
      <ChatWindow
        chatMessages={chatMessages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSendMessage={handleSendMessage}
        userId={userId}
      />
    </div>
  );
}
