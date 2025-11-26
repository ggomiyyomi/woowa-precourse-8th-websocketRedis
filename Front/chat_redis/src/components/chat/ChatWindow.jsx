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

      {/* 참여하지 않은 경우 */}
      {!isJoined ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 border rounded-lg bg-gray-50">
          이 방의 채팅을 보려면 먼저 참여해야 합니다.
        </div>
      ) : (
        <>
          {/* 메시지 리스트 */}
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
        </>
      )}
    </div>
  );
}
