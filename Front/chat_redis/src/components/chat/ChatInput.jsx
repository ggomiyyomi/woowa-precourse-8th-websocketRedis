// src/components/chat/ChatInput.jsx

export default function ChatInput({
  chatInput,
  setChatInput,
  handleSendMessage
}) {
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <input
        type="text"
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        placeholder="메시지를 입력하세요..."
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={handleSendMessage}
        style={{
          background: "#007bff",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: 8,
          cursor: "pointer"
        }}
      >
        전송
      </button>
    </div>
  );
}
