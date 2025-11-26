export default function ParticipantList({ participants }) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h3 className="text-xl font-semibold mb-3">참여자 목록</h3>

      {participants.length === 0 ? (
        <p className="text-gray-500">아직 참여자가 없습니다.</p>
      ) : (
        <div className="space-y-3">
          {participants.map((p) => (
            <div
              key={p.participantId}
              className="p-3 border rounded-lg bg-gray-50"
            >
              <p className="text-sm font-bold">사용자 ID: {p.userId}</p>
              <p className="text-xs text-gray-600">참여 시각: {p.joinedAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
