import { useEffect, useState } from "react";

function RoomList() {
  const [rooms, setRooms] = useState([]); 
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState("");

  // 🔥 현재 사용자 ID 선택 (로그인 없음) - 추후 변경 예정
  const [userId, setUserId] = useState(1);

  // 🌟 방 생성 Form 상태
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newMax, setNewMax] = useState(10);

  // ✨ 방 수정 UI 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editMax, setEditMax] = useState(10);

  // ⭐ 메시지 state
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

  // 방 목록 불러오기
  const fetchRooms = () => {
    fetch("http://localhost:8090/chat/group/list")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // 방 상세 정보
  const fetchRoomInfo = (roomId) => {
    fetch(`http://localhost:8090/chat/group/${roomId}`)
      .then(res => res.json())
      .then(data => {
        setSelectedRoomInfo(data);

        // ✅ 방 상세 가져오면 수정폼 기본값도 세팅
        setEditTitle(data.roomTitle || "");
        setEditDesc(data.roomDescription || "");
        setEditMax(data.maxUserCnt || 10);
      })
      .catch(err => console.error(err));
  };

  // 참여자 목록 불러오기
  const fetchParticipants = (roomId) => {
    fetch(`http://localhost:8090/chat/group/${roomId}/participants`)
      .then(res => res.json())
      .then(data => setParticipants(data))
      .catch(err => console.error(err));
  };

  // 방 클릭 시
  const handleRoomClick = (roomId) => {
    setSelectedRoom(roomId);
    fetchRoomInfo(roomId);
    fetchParticipants(roomId);
    setMessage(""); 
    setIsEditing(false); // 다른 방 누르면 수정모드 꺼지게
    fetchMessages(roomId);
  };

  // 참여하기
  const handleJoin = () => {
    fetch(
      `http://localhost:8090/chat/group/join?gcrId=${selectedRoom}&userId=${userId}`,
      { method: "POST" }
    )
      .then((res) => res.text())
      .then((data) => {
        setMessage(data);
        if (data === "참여 완료") {
          fetchParticipants(selectedRoom);
        }
      })
      .catch((err) => console.error(err));
  };
            
  const isOwner = selectedRoomInfo && selectedRoomInfo.ownerUserId === userId;
  const isJoined = participants.some((p) => p.userId === userId);
  const isFull =
    selectedRoomInfo && participants.length >= selectedRoomInfo.maxUserCnt;

  // ⭐ 방 생성 기능
  const createRoom = () => {
    const params = new URLSearchParams();
    params.append("title", newTitle);
    params.append("description", newDesc);
    params.append("maxUserCnt", newMax);
    params.append("userId", userId);

    fetch(`http://localhost:8090/chat/group/create?${params.toString()}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((newRoomId) => {
        alert(`방 생성 성공! ID = ${newRoomId}`);
        setNewTitle("");
        setNewDesc("");
        setNewMax(10);
        fetchRooms();
      })
      .catch((err) => console.error(err));
  };
  
  // ⭐ 방 떠나기 기능
  const handleLeave = () => {
    fetch(
      `http://localhost:8090/chat/group/leave?gcrId=${selectedRoom}&userId=${userId}`,
      { method: "POST" }
    )
      .then(res => res.text())
      .then(data => {
        setMessage(data);

        if (data === "나가기 완료") {
          fetchParticipants(selectedRoom);
          setSelectedRoom(null);
          setSelectedRoomInfo(null);
          setParticipants([]);
        }
      })
      .catch(err => console.error(err));
  };

  // ✅ 방 수정 저장 기능
  const handleUpdate = () => {
  const payload = {
    gcrId: selectedRoom,
    userId: userId,
    title: editTitle,
    description: editDesc,
    maxUserCnt: editMax
  };

  fetch("http://localhost:8090/chat/group/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then((res) => res.text())
    .then((data) => {
      setMessage(data);

      if (data === "수정 완료") {
        fetchRoomInfo(selectedRoom);
        fetchParticipants(selectedRoom);
        fetchRooms();
        setIsEditing(false);
      }
    })
    .catch((err) => console.error(err));
};

  // 방 삭제 기능
  const handleDelete = () => {
  if (!window.confirm("정말 방을 삭제하시겠습니까?")) return;

  fetch(
    `http://localhost:8090/chat/group/delete?gcrId=${selectedRoom}&userId=${userId}`,
    { method: "POST" }
  )
    .then((res) => res.text())
    .then((data) => {
      alert(data);

      if (data === "삭제 완료") {
        fetchRooms();
        setSelectedRoom(null);
        setSelectedRoomInfo(null);
        setParticipants([]);
      }
    })
    .catch((err) => console.error(err));
};

    //메시지 목록 불러오기
    const fetchMessages = (roomId) => {
    fetch(
        `http://localhost:8090/chat/message/list?roomType=GROUP&roomId=${roomId}&afterId=0&limit=200`
    )
        .then((res) => res.json())
        .then((data) => setChatMessages(data))
        .catch((err) => console.error(err));
    };
    //메시지 보내기
    const handleSendMessage = () => {
    if (chatInput.trim() === "") return;

    const payload = {
        roomType: "GROUP",
        roomId: selectedRoom,
        userId: userId,
        messageType: "TEXT",
        content: chatInput,
    };

    fetch("http://localhost:8090/chat/message/send", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then((res) => res.json())
        .then(() => {
        setChatInput("");
        fetchMessages(selectedRoom); // 메시지 다시 불러오기
        })
        .catch((err) => console.error(err));
    };


  return (
    <div style={{ padding: 20 }}>
      <h2>그룹 채팅방 목록</h2>

      {/* 🔥 사용자 선택 */}
      <div style={{ marginBottom: 20 }}>
        <label>현재 사용자 ID: </label>
        <select
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          style={{ padding: 5, marginLeft: 10 }}
        >
          {[1,2,3,4,5,6,7,8,9,10].map(id => (
            <option key={id} value={id}>User {id}</option>
          ))}
        </select>
      </div>

      {/* 🌟 방 생성 UI */}
      <div style={{ marginBottom: 30, padding: 15, border: "2px solid #777", borderRadius: 10 }}>
        <h3>🛠 새 그룹 채팅방 만들기</h3>

        <input
          type="text"
          placeholder="방 제목"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <input
          type="text"
          placeholder="방 설명"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <input
          type="number"
          min="1"
          placeholder="최대 인원"
          value={newMax}
          onChange={(e) => setNewMax(Number(e.target.value))}
          style={{ width: 150, padding: 8 }}
        />

        <button
          onClick={createRoom}
          style={{
            marginLeft: 15,
            background: "#28a745",
            color: "white",
            padding: "8px 15px",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          방 생성하기
        </button>
      </div>

      {/* 방 리스트 */}
      {rooms.map((room) => (
        <div
          key={room.gcrId}
          style={{
            border: "1px solid gray",
            padding: 10,
            margin: "10px 0",
            cursor: "pointer",
            borderRadius: 8
          }}
          onClick={() => handleRoomClick(room.gcrId)}
        >
          <h3>{room.roomTitle}</h3>
          <p>{room.roomDescription}</p>
          <p>정원: {room.maxUserCnt}</p>
        </div>
      ))}

      {/* 방 상세 + 참여자 */}
      {selectedRoom && selectedRoomInfo && (
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

          {/* ✅ 방장만 수정 버튼 보임 */}
          {isOwner && (
            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => setIsEditing((prev) => !prev)}
                style={{
                  background: "#ff9800",
                  color: "white",
                  padding: "8px 15px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  marginRight: 8
                }}
              >
                {isEditing ? "수정 취소" : "방 수정하기"}
              </button>
            </div>
          )}

          {/* ✅ 수정 폼(방장만) */}
          {isOwner && isEditing && (
            <div
              style={{
                marginTop: 15,
                padding: 12,
                border: "1px solid #999",
                borderRadius: 8,
                background: "#f9f9f9"
              }}
            >
              <h4>✏️ 방 정보 수정</h4>

              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="방 제목"
                style={{ width: "100%", padding: 8, marginBottom: 8 }}
              />

              <input
                type="text"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="방 설명"
                style={{ width: "100%", padding: 8, marginBottom: 8 }}
              />

              <input
                type="number"
                min="1"
                value={editMax}
                onChange={(e) => setEditMax(Number(e.target.value))}
                placeholder="최대 인원"
                style={{ width: 160, padding: 8, marginRight: 8 }}
              />

              <button
                onClick={handleUpdate}
                style={{
                  background: "#4caf50",
                  color: "white",
                  padding: "8px 15px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer"
                }}
              >
                저장
              </button>

              <p style={{ fontSize: 12, marginTop: 8, color: "#555" }}>
                ※ 현재 인원({participants.length})보다 작은 정원으로 줄이면 서버에서 거절됩니다.
              </p>
            </div>
          )}

        {/* ✅ 방장만 삭제 버튼 보임 */}
          {isOwner && (
            <button
                onClick={handleDelete}
                style={{
                background: "black",
                color: "white",
                padding: "8px 15px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                marginTop: 10
                }}
            >
                방 삭제
            </button>
           )}


          {/* 참여/나가기 버튼(방장 제외) */}
          {!isOwner && !isJoined && !isFull && (
            <button
              onClick={handleJoin}
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
              onClick={handleLeave}
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

          <h3 style={{ marginTop: 20 }}>참여자 목록</h3>

          {participants.length === 0 ? (
            <p>아직 참여자가 없습니다.</p>
          ) : (
            participants.map((p) => (
              <div
                key={p.participantId}
                style={{
                  border: "1px solid #aaa",
                  padding: 8,
                  margin: "5px 0",
                  borderRadius: 6
                }}
              >
                <p>사용자 ID: {p.userId}</p>
                <p>참여 시각: {p.joinedAt}</p>
              </div>
            ))
          )}
        </div>
      )}

      {/* ⭐⭐⭐ 채팅 UI ⭐⭐⭐ */}
<h3 style={{ marginTop: 30 }}>💬 채팅</h3>

<div
  style={{
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: 10,
    height: 300,
    overflowY: "scroll",
    background: "#fafafa",
    marginBottom: 15
  }}
>
  {chatMessages.length === 0 ? (
    <p style={{ color: "#666" }}>아직 메시지가 없습니다.</p>
  ) : (
    chatMessages.map((msg) => (
      <div
        key={msg.cmId}
        style={{
          display: "flex",
          justifyContent: msg.userId === userId ? "flex-end" : "flex-start",
          marginBottom: 10
        }}
      >
        <div
          style={{
            maxWidth: "70%",
            padding: "8px 12px",
            borderRadius: 12,
            background: msg.userId === userId ? "#cfe2ff" : "#e9ecef",
            textAlign: "left"
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", fontSize: 12 }}>
            사용자 {msg.userId}
          </p>
          <p style={{ margin: "5px 0" }}>{msg.content}</p>
          <p style={{ fontSize: 10, color: "#777", textAlign: "right" }}>
            {msg.createdAt}
          </p>
        </div>
      </div>
    ))
  )}
</div>

{/* 입력창 */}
<div style={{ display: "flex", gap: 10 }}>
  <input
    type="text"
    value={chatInput}
    onChange={(e) => setChatInput(e.target.value)}
    placeholder="메시지를 입력하세요..."
    style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
  />

  <button
    onClick={handleSendMessage}
    style={{
      background: "#007bff",
      color: "white",
      padding: "10px 15px",
      border: "none",
      borderRadius: 8,
      cursor: "pointer"
    }}
  >
    전송
  </button>
</div>
    </div>
  );
}

export default RoomList;