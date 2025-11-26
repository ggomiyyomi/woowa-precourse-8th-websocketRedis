export default function ChatInput({
  chatInput,
  setChatInput,
  handleSendMessage,
  isJoined,
}) {
  const disabled = !isJoined;

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        placeholder={
          disabled
            ? "참여해야 메시지를 보낼 수 있습니다"
            : "메시지를 입력하세요..."
        }
        disabled={disabled}
        className={`flex-1 p-2 rounded-lg border ${
          disabled ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
      />

      <button
        onClick={disabled ? undefined : handleSendMessage}
        disabled={disabled}
        className={`px-4 py-2 rounded-lg text-white ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        전송
      </button>
    </div>
  );
}
