import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import RoomItem from "./RoomItem";
import ChatWindow from "../chat/ChatWindow";
import ParticipantList from "./ParticipantList";
import RoomDetailModal from "./RoomDetailModal";
import CreateRoomModal from "./CreateRoomModal";

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRoomInfo, setSelectedRoomInfo] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState("");

  // 사용자 ID
  const [userId, setUserId] = useState(1);

  // 방 생성 모달
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // 방 상세 모달 (RoomDetailModal)
  const [isRoomDetailOpen, setIsRoomDetailOpen] = useState(false);

  // 채팅 상태
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  // 방 수정 상태
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editMax, setEditMax] = useState(10);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newMax, setNewMax] = useState(10);

  // STOMP
  const [stompClient, setStompClient] = useState(null);

  // 방 리스트
  const fetchRooms = () => {
    fetch("http://localhost:8090/chat/group/list")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // 방 상세 정보
  const fetchRoomInfo = (roomId) => {
    fetch(`http://localhost:8090/chat/group/${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedRoomInfo(data);
        setEditTitle(data.roomTitle);
        setEditDesc(data.roomDescription);
        setEditMax(data.maxUserCnt);
      });
  };

  // 참여자 불러오기
  const fetchParticipants = (roomId) => {
    fetch(`http://localhost:8090/chat/group/${roomId}/participants`)
      .then((res) => res.json())
      .then((data) => setParticipants(data));
  };

  // 방 클릭
  const handleRoomClick = (roomId) => {
    setSelectedRoom(roomId);
    setMessage("");

    fetchRoomInfo(roomId);
    fetchParticipants(roomId);
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
        if (data === "참여 완료") fetchParticipants(selectedRoom);
      });
  };

  // 나가기
  const handleLeave = () => {
    fetch(
      `http://localhost:8090/chat/group/leave?gcrId=${selectedRoom}&userId=${userId}`,
      { method: "POST" }
    )
      .then((res) => res.text())
      .then((data) => {
        setMessage(data);
        if (data === "나가기 완료") fetchParticipants(selectedRoom);
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.text())
      .then((data) => {
        setMessage(data);
        if (data === "수정 완료") {
          fetchRoomInfo(selectedRoom);
          fetchParticipants(selectedRoom);
          fetchRooms();
        }
      });
  };

  // 방 삭제
  const handleDelete = () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

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

  // 채팅 메시지 로딩
  const fetchMessages = (roomId) => {
    fetch(
      `http://localhost:8090/chat/message/list?roomType=GROUP&roomId=${roomId}&afterId=0&limit=200`
    )
      .then((res) => res.json())
      .then((data) => setChatMessages(data));
  };

  // 메시지 전송
  const handleSendMessage = () => {
    if (!chatInput.trim() || !stompClient) return;

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
      .then(() => {
        alert(`방 생성 성공!`);
        setNewTitle("");
        setNewDesc("");
        setNewMax(10);

        fetchRooms();
        setIsCreateModalOpen(false); // 🔥 모달 닫기
      });
  };

  // STOMP 연결
  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8090/ws-chat",
      reconnectDelay: 5000,
      debug: () => {},
    });

    client.onConnect = () => {
      setStompClient(client);
    };

    client.activate();
    return () => client.deactivate();
  }, []);

  // STOMP 구독
  useEffect(() => {
    if (!stompClient || !selectedRoom) return;

    const sub = stompClient.subscribe(
      `/topic/chat/GROUP/${selectedRoom}`,
      (msg) => {
        const data = JSON.parse(msg.body);
        setChatMessages((prev) => [...prev, data]);
      }
    );

    return () => sub.unsubscribe();
  }, [stompClient, selectedRoom]);

  return (
    <div className="grid grid-cols-3 gap-4 h-screen overflow-hidden">
      {/* 왼쪽 - 방 목록 */}
      <div className="pb-3 pt-3 col-span-1 h-full overflow-y-auto scrollbar-hide">
        <h2 className="text-2xl font-bold mb-3">그룹 채팅방 목록</h2>

        {/* 사용자 선택 */}
        <div className="mb-4">
          <label className="mr-2">현재 사용자 ID:</label>
          <select
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="border px-3 py-1 rounded-lg"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
              <option key={id} value={id}>
                User {id}
              </option>
            ))}
          </select>
        </div>

        {/* 새 그룹 만들기 모달 버튼 */}
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full py-2 bg-green-600 text-white rounded-lg mb-4"
        >
          + 새 그룹 만들기
        </button>

        {/* 방 리스트 */}
        {rooms.map((room) => (
          <RoomItem key={room.gcrId} room={room} onClick={handleRoomClick} />
        ))}
      </div>

      {/* 가운데 - 채팅 + 설정버튼 */}
      <div className="pb-3 pt-3 col-span-1 flex flex-col h-full min-h-0 overflow-hidden">
        {selectedRoom && selectedRoomInfo && (
          <>
            {/* 상단: 방 제목 + ⚙️ 설정 버튼 */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold">
                {selectedRoomInfo.roomTitle}
              </h3>

              <button
                onClick={() => setIsRoomDetailOpen(true)}
                className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                ⚙️ 설정
              </button>
            </div>

            {/* 채팅창 */}
            <ChatWindow
              chatMessages={chatMessages}
              chatInput={chatInput}
              setChatInput={setChatInput}
              handleSendMessage={handleSendMessage}
              userId={userId}
              ownerUserId={selectedRoomInfo.ownerUserId}
              isJoined={participants.some((p) => p.userId === userId)}
            />
          </>
        )}
      </div>

      {/* 오른쪽 - 참여자 목록 */}
      <div className="pb-3 pt-3 col-span-1 h-full overflow-y-auto">
        {selectedRoom && selectedRoomInfo && (
          <ParticipantList participants={participants} />
        )}
      </div>

      {/* 방 상세 모달 */}
      {isRoomDetailOpen && selectedRoomInfo && (
        <RoomDetailModal
          onClose={() => setIsRoomDetailOpen(false)}
          selectedRoom={selectedRoom}
          selectedRoomInfo={selectedRoomInfo}
          participants={participants}
          userId={userId}
          message={message}
          editTitle={editTitle}
          editDesc={editDesc}
          editMax={editMax}
          setEditTitle={setEditTitle}
          setEditDesc={setEditDesc}
          setEditMax={setEditMax}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          handleJoin={handleJoin}
          handleLeave={handleLeave}
        />
      )}

      {/* 새 그룹 생성 모달 */}
      {isCreateModalOpen && (
        <CreateRoomModal
          onClose={() => setIsCreateModalOpen(false)}
          newTitle={newTitle}
          newDesc={newDesc}
          newMax={newMax}
          setNewTitle={setNewTitle}
          setNewDesc={setNewDesc}
          setNewMax={setNewMax}
          handleCreate={createRoom}
        />
      )}
    </div>
  );
}

export default RoomList;
