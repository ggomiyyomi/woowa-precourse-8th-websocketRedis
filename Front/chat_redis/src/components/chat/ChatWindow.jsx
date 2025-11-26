import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatWindow({
  chatMessages,
  chatInput,
  setChatInput,
  handleSendMessage,
  userId,
  ownerUserId,
  isJoined,
}) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">💬 채팅</h3>

      <MessageList
        chatMessages={chatMessages}
        userId={userId}
        ownerUserId={ownerUserId}
      />

      <ChatInput
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSendMessage={handleSendMessage}
        isJoined={isJoined} // 🔥 전달
      />
    </div>
  );
}
