export default function MessageItem({ msg, userId, ownerUserId }) {
  const isMine = msg.userId === userId;
  const isOwner = msg.userId === ownerUserId; // 🔥 방장 여부

  return (
    <div className={`flex mb-2 ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-3 rounded-xl ${
          isMine ? "bg-blue-200" : "bg-gray-200"
        }`}
      >
        {/* 🔥 사용자 이름 + (방장) 표시 */}
        <p className="text-sm font-semibold mb-1">
          {isOwner ? "방장" : `사용자 ${msg.userId}`}
        </p>

        <p>{msg.content}</p>

        <p className="text-[10px] text-gray-600 text-right mt-1">
          {msg.createdAt}
        </p>
      </div>
    </div>
  );
}
