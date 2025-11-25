// src/components/room/RoomEditor.jsx

export default function RoomEditor({
  editTitle,
  editDesc,
  editMax,
  setEditTitle,
  setEditDesc,
  setEditMax,
  onUpdateRoom,
  participantsCount
}) {
  return (
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
        onClick={onUpdateRoom}
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
        ※ 현재 인원({participantsCount})보다 작은 정원으로 줄이면 서버에서 거절됩니다.
      </p>
    </div>
  );
}
