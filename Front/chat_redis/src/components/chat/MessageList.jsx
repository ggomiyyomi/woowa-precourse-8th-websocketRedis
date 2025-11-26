import MessageItem from "./MessageItem";

export default function MessageList({ chatMessages, userId, ownerUserId }) {
  return (
    <div className="border rounded-lg p-3 h-80 overflow-y-scroll bg-gray-50 mb-4">
      {chatMessages.length === 0 ? (
        <p className="text-gray-500">아직 메시지가 없습니다.</p>
      ) : (
        chatMessages.map((msg) => (
          <MessageItem
            key={msg.cmId}
            msg={msg}
            userId={userId}
            ownerUserId={ownerUserId} // 🔥 전달
          />
        ))
      )}
    </div>
  );
}
