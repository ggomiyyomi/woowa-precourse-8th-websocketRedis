export default function CreateRoomModal({
  onClose,
  newTitle,
  newDesc,
  newMax,
  setNewTitle,
  setNewDesc,
  setNewMax,
  handleCreate,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[450px] p-6 rounded-xl shadow-xl relative">
        {/* 닫기 */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-5">🛠 새 그룹 만들기</h2>

        <div className="space-y-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="방 제목"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="방 설명"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            min="1"
            value={newMax}
            onChange={(e) => setNewMax(Number(e.target.value))}
            placeholder="최대 인원"
            className="w-full border p-3 rounded-lg"
          />

          <button
            onClick={handleCreate}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            방 생성하기
          </button>
        </div>
      </div>
    </div>
  );
}
