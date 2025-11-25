import { useEffect, useState } from "react";

function RoomList() {
  const [rooms, setRooms] = useState([]); 
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  // 방 목록 불러오기
  useEffect(() => {
    fetch("http://localhost:8090/chat/group/list")
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(err => console.error(err));
  }, []);

  // 특정 방 참여자 불러오기
  useEffect(() => {
    if (selectedRoom) {
      fetch(`http://localhost:8090/chat/group/${selectedRoom}/participants`)
        .then(res => res.json())
        .then(data => setParticipants(data))
        .catch(err => console.error(err));
    }
  }, [selectedRoom]);

  return (
    <div style={{ padding: 20 }}>
      <h2>그룹 채팅방 목록</h2>

      {rooms.map(room => (
        <div
          key={room.gcrId}
          style={{
            border: "1px solid gray",
            padding: 10,
            margin: "10px 0",
            cursor: "pointer",
            borderRadius: 8
          }}
          onClick={() => setSelectedRoom(room.gcrId)}
        >
          <h3>{room.roomTitle}</h3>
          <p>{room.roomDescription}</p>
          <p>정원: {room.maxUserCnt}</p>
        </div>
      ))}

      {/* 참여자 목록 */}
      {selectedRoom && (
        <div
          style={{
            marginTop: 30,
            padding: 15,
            border: "2px solid black",
            borderRadius: 10
          }}
        >
          <h3>참여자 목록 (방 ID: {selectedRoom})</h3>

          {participants.length === 0 ? (
            <p>아직 참여자가 없습니다.</p>
          ) : (
            participants.map(p => (
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
                <p>lastReadMessageId: {p.lastReadMessageId}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default RoomList;
