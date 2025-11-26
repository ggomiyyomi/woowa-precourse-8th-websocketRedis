// src/components/room/RoomDetailModal.jsx

import RoomEditor from "./RoomEditor";

export default function RoomDetailModal({
  onClose,
  selectedRoomInfo,
  participants,

  // 상태
  userId,
  message,

  // 수정 상태
  editTitle,
  editDesc,
  editMax,
  setEditTitle,
  setEditDesc,
  setEditMax,

  // 이벤트 핸들러
  handleUpdate,
  handleDelete,
  handleJoin,
  handleLeave,
}) {
  // 🚨 selectedRoomInfo 로딩 되기 전 방어 코드
  if (!selectedRoomInfo) return null;

  const isOwner = selectedRoomInfo.ownerUserId === userId;
  const isJoined = participants.some((p) => p.userId === userId);
  const isFull = participants.length >= selectedRoomInfo.maxUserCnt;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[550px] p-6 rounded-xl shadow-xl relative">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">⚙️ 방 설정</h2>

        {/* 방 정보 */}
        <div className="mb-4 space-y-1">
          <p className="text-lg font-semibold">{selectedRoomInfo.roomTitle}</p>
          <p className="text-gray-700">{selectedRoomInfo.roomDescription}</p>
          <p className="text-sm text-gray-600">
            인원: {participants.length} / {selectedRoomInfo.maxUserCnt}
          </p>
        </div>

        <hr className="my-4" />

        {/* 방장일 때 */}
        {isOwner ? (
          <>
            <h3 className="text-lg font-semibold mb-2">방 정보 수정</h3>

            <RoomEditor
              editTitle={editTitle}
              editDesc={editDesc}
              editMax={editMax}
              setEditTitle={setEditTitle}
              setEditDesc={setEditDesc}
              setEditMax={setEditMax}
              participantsCount={participants.length}
              onUpdateRoom={handleUpdate}
            />

            <button
              onClick={handleDelete}
              className="mt-4 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              방 삭제하기
            </button>
          </>
        ) : (
          <>
            {/* 참여 / 나가기 */}
            <div className="text-center mt-4">
              {!isJoined && !isFull && (
                <button
                  onClick={handleJoin}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  참여하기
                </button>
              )}

              {isJoined && (
                <button
                  onClick={handleLeave}
                  className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  나가기
                </button>
              )}

              {isFull && !isJoined && (
                <p className="text-red-500 mt-2">❌ 방 인원이 가득 찼습니다.</p>
              )}
            </div>
          </>
        )}

        {message && (
          <p className="text-center text-sm text-gray-700 mt-4">
            서버 메시지: {message}
          </p>
        )}
      </div>
    </div>
  );
}
