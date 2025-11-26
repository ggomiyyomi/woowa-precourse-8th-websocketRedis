import ParticipantList from "./ParticipantList";
import RoomEditor from "./RoomEditor";
import ChatWindow from "../chat/ChatWindow";

export default function RoomDetail({
  selectedRoomInfo,
  participants,
  isOwner,
  isJoined,
  isFull,
  isEditing,

  editTitle,
  editDesc,
  editMax,
  onToggleEdit,
  onUpdateRoom,
  onDeleteRoom,
  onJoin,
  onLeave,

  setEditTitle,
  setEditDesc,
  setEditMax,

  message,
}) {
  return (
    <div className="mt-6 p-5 border rounded-2xl shadow bg-white">
      <h3 className="text-xl font-bold">방 상세 정보</h3>

      <p className="text-gray-700 mt-2">
        <span className="font-semibold">방 제목:</span>{" "}
        {selectedRoomInfo.roomTitle}
      </p>

      <p className="text-gray-700 mt-1">
        <span className="font-semibold">설명:</span>{" "}
        {selectedRoomInfo.roomDescription}
      </p>

      <p className="text-gray-700 mt-1">
        <span className="font-semibold">인원:</span> {participants.length} /{" "}
        {selectedRoomInfo.maxUserCnt}
      </p>

      {/* 방 수정 / 취소 */}
      {isOwner && (
        <button
          onClick={onToggleEdit}
          className="
            mt-4 px-4 py-2 rounded-lg text-white
            bg-yellow-500 hover:bg-yellow-600
          "
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
          className="mt-4 px-4 py-2 rounded-lg text-white bg-black hover:bg-gray-800"
        >
          방 삭제
        </button>
      )}

      {/* 참여 조건 */}
      {!isOwner && !isJoined && !isFull && (
        <button
          onClick={onJoin}
          className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          참여하기
        </button>
      )}

      {!isOwner && isJoined && (
        <button
          onClick={onLeave}
          className="mt-4 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          나가기
        </button>
      )}

      {isJoined && (
        <p className="text-green-700 mt-2 text-sm">
          ✔ 이미 참여한 사용자입니다.
        </p>
      )}
      {isFull && (
        <p className="text-red-700 mt-2 text-sm">❌ 방 인원이 가득 찼습니다.</p>
      )}
      {message && (
        <p className="mt-2 text-blue-700 text-sm">서버 응답: {message}</p>
      )}
    </div>
  );
}
