export default function RoomEditor({
  editTitle,
  editDesc,
  editMax,
  setEditTitle,
  setEditDesc,
  setEditMax,
  onUpdateRoom,
  participantsCount,
}) {
  return (
    <div className="mt-4 p-4 bg-gray-50 border rounded-xl shadow-sm">
      <h4 className="font-semibold text-lg mb-3">✏️ 방 정보 수정</h4>

      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="방 제목"
        className="w-full p-2 border rounded-lg mb-3"
      />

      <input
        type="text"
        value={editDesc}
        onChange={(e) => setEditDesc(e.target.value)}
        placeholder="방 설명"
        className="w-full p-2 border rounded-lg mb-3"
      />

      <input
        type="number"
        min="1"
        value={editMax}
        onChange={(e) => setEditMax(Number(e.target.value))}
        placeholder="최대 인원"
        className="w-40 p-2 border rounded-lg"
      />

      <button
        onClick={onUpdateRoom}
        className="ml-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        저장
      </button>

      <p className="text-xs text-gray-500 mt-2">
        ※ 현재 인원({participantsCount})보다 작은 정원으로 줄이면 서버에서
        거절됩니다.
      </p>
    </div>
  );
}
