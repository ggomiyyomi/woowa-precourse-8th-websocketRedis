
import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import RoomItem from "./RoomItem";
import RoomDetail from "./RoomDetail";


function RoomList() {
  const [rooms, setRooms] = useState([]); 
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState("");

  // 🔥 현재 사용자 ID 선택
  const [userId, setUserId] = useState(1);

  // 방 생성 상태
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newMax, setNewMax] = useState(10);

  // 방 수정 UI 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editMax, setEditMax] = useState(10);

  // 메시지 상태
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  // STOMP 클라이언트
  const [stompClient, setStompClient] = useState(null);

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

  // 방 상세
  const fetchRoomInfo = (roomId) => {
    fetch(`http://localhost:8090/chat/group/${roomId}`)
      .then(res => res.json())
      .then(data => {
        setSelectedRoomInfo(data);
        setEditTitle(data.roomTitle || "");
        setEditDesc(data.roomDescription || "");
        setEditMax(data.maxUserCnt || 10);
      });
  };

  // 참여자 목록
  const fetchParticipants = (roomId) => {
    fetch(`http://localhost:8090/chat/group/${roomId}/participants`)
      .then(res => res.json())
      .then(data => setParticipants(data));
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
      });
  };

  const isOwner = selectedRoomInfo && selectedRoomInfo.ownerUserId === userId;
  const isJoined = participants.some((p) => p.userId === userId);
  const isFull =
    selectedRoomInfo && participants.length >= selectedRoomInfo.maxUserCnt;

  // 방 생성
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
      });
  };

  // 방 나가기
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
      });
  };

  // 방 수정
  const handleUpdate = () => {
    const payload = {
      gcrId: selectedRoom,
      userId,
      title: editTitle,
      description: editDesc,
      maxUserCnt: editMax,
    };

    fetch("http://localhost:8090/chat/group/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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
      });
  };

  // 방 삭제
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
      });
  };

  // 메시지 불러오기
  const fetchMessages = (roomId) => {
    fetch(
      `http://localhost:8090/chat/message/list?roomType=GROUP&roomId=${roomId}&afterId=0&limit=200`
    )
      .then((res) => res.json())
      .then((data) => setChatMessages(data));
  };

  // 메시지 전송
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    if (!stompClient || !selectedRoom) return;

    const payload = {
      roomType: "GROUP",
      roomId: selectedRoom,
      userId,
      messageType: "TEXT",
      content: chatInput,
      imageUrl: null,
    };

    stompClient.publish({
      destination: "/app/chat.send",
      body: JSON.stringify(payload),
    });

    setChatInput("");
  };

  // ⭐⭐⭐ STOMP 연결 (최신 방식)
useEffect(() => {
  const client = new Client({
    brokerURL: "ws://localhost:8090/ws-chat",
    reconnectDelay: 5000,
    debug: () => {},
  });

  client.onConnect = () => {
    console.log("STOMP Connected!");
    setStompClient(client);
  };

  client.activate();

  return () => client.deactivate();
}, []);

  // 방 클릭
  const handleRoomClick = (roomId) => {
    setSelectedRoom(roomId);
    fetchRoomInfo(roomId);
    fetchParticipants(roomId);
    setMessage("");
    setIsEditing(false);
    fetchMessages(roomId);
  };

  // STOMP 구독
  useEffect(() => {
    if (!stompClient || !selectedRoom) return;

    const destination = `/topic/chat/GROUP/${selectedRoom}`;
    console.log("subscribe:", destination);

    const subscription = stompClient.subscribe(destination, (msg) => {
      const data = JSON.parse(msg.body);
      setChatMessages((prev) => [...prev, data]);
    });

    return () => subscription.unsubscribe();
  }, [stompClient, selectedRoom]);


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
    <RoomItem
        key={room.gcrId}
        room={room}
        onClick={handleRoomClick}
    />
    ))}


      {/* 방 상세 + 참여자 */}
        {selectedRoom && selectedRoomInfo && (
        <RoomDetail
        selectedRoomInfo={selectedRoomInfo}
        participants={participants}
        isOwner={isOwner}
        isJoined={isJoined}
        isFull={isFull}
        isEditing={isEditing}

        editTitle={editTitle}
        editDesc={editDesc}
        editMax={editMax}
        setEditTitle={setEditTitle}
        setEditDesc={setEditDesc}
        setEditMax={setEditMax}

        onToggleEdit={() => setIsEditing((p) => !p)}
        onUpdateRoom={handleUpdate}
        onDeleteRoom={handleDelete}
        onJoin={handleJoin}
        onLeave={handleLeave}

        message={message}

        chatMessages={chatMessages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSendMessage={handleSendMessage}
        userId={userId}
        />
        )}

    </div>
  );
}

export default RoomList;