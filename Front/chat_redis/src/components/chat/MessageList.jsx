import MessageItem from "./MessageItem";

export default function MessageList({ chatMessages, userId }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 10,
        height: 300,
        overflowY: "scroll",
        background: "#fafafa",
        marginBottom: 15,
      }}
    >
      {chatMessages.length === 0 ? (
        <p style={{ color: "#666" }}>아직 메시지가 없습니다.</p>
      ) : (
        chatMessages.map((msg) => (
          <MessageItem key={msg.cmId} msg={msg} userId={userId} />
        ))
      )}
    </div>
  );
}
