export default function MessageItem({ msg, userId }) {
  const isMine = msg.userId === userId;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "8px 12px",
          borderRadius: 12,
          background: isMine ? "#cfe2ff" : "#e9ecef",
          textAlign: "left",
        }}
      >
        <p
          style={{
            margin: 0,
            fontWeight: "bold",
            fontSize: 12,
          }}
        >
          사용자 {msg.userId}
        </p>
        <p style={{ margin: "5px 0" }}>{msg.content}</p>
        <p
          style={{
            fontSize: 10,
            color: "#777",
            textAlign: "right",
          }}
        >
          {msg.createdAt}
        </p>
      </div>
    </div>
  );
}
