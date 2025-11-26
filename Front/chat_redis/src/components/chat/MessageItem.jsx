import { formatDateTime } from "../../utils/formatDateTime";

export default function MessageItem({ msg, userId, ownerUserId }) {
  const isMine = msg.userId === userId;
  const isOwnerUser = msg.userId === ownerUserId;

  return (
    <div className={`flex mb-3 ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] p-3 rounded-2xl ${
          isMine ? "bg-blue-200" : "bg-gray-200"
        }`}
      >
        <p className="text-sm font-bold mb-1">
          {isOwnerUser ? "방장" : `사용자 ${msg.userId}`}
        </p>

        <p className="whitespace-pre-wrap break-words mb-1">{msg.content}</p>
        <p className="text-xs text-gray-600 text-right">
          {formatDateTime(msg.createdAt)}
        </p>
      </div>
    </div>
  );
}
