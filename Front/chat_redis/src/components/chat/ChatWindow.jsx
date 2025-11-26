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
    <div className="flex flex-col h-full min-h-0">
      <h3 className="text-lg font-bold mb-2">💬 채팅</h3>
      <div className="flex-1 min-h-0">
        <MessageList
          chatMessages={chatMessages}
          userId={userId}
          ownerUserId={ownerUserId}
        />
      </div>
      {/* 입력창 */}
      <div className="mt-2">
        <ChatInput
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSendMessage={handleSendMessage}
          isJoined={isJoined}
        />
      </div>
    </div>
  );
}
