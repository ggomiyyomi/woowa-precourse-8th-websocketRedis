import { useState } from "react";

export default function ChatInput({
  chatInput,
  setChatInput,
  handleSendMessage,
  isJoined,
}) {
  const disabled = !isJoined;

  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = (e) => {
    if (disabled) return;

    if (isComposing) return;

    if (e.key === "Enter" && e.shiftKey) return;

    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex gap-2">
      <textarea
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)} // ⬅️ 한글 입력 시작
        onCompositionEnd={() => setIsComposing(false)} // ⬅️ 한글 입력 끝
        placeholder={
          disabled
            ? "참여해야 메시지를 보낼 수 있습니다"
            : "메시지를 입력하세요..."
        }
        disabled={disabled}
        rows={1}
        className={`flex-1 p-2 rounded-lg border resize-none ${
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
