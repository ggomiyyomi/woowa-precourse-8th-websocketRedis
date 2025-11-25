
export default function ParticipantList({ participants }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>참여자 목록</h3>

      {participants.length === 0 ? (
        <p>아직 참여자가 없습니다.</p>
      ) : (
        participants.map((p) => (
          <div
            key={p.participantId}
            style={{
              border: "1px solid #aaa",
              padding: 8,
              margin: "5px 0",
              borderRadius: 6
            }}
          >
            <p>사용자 ID: {p.userId}</p>
            <p>참여 시각: {p.joinedAt}</p>
          </div>
        ))
      )}
    </div>
  );
}
