import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatWindow({
  chatMessages,
  chatInput,
  setChatInput,
  handleSendMessage,
  userId,
}) {
  return (
    <div style={{ marginTop: 30 }}>
      <h3>💬 채팅</h3>

      {/* 메시지 리스트 */}
      <MessageList chatMessages={chatMessages} userId={userId} />

      {/* 입력창 */}
      <ChatInput
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
