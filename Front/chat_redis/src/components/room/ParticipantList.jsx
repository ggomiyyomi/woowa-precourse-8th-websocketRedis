import { formatDateTime } from "../../utils/formatDateTime";

export default function ParticipantList({ participants, ownerUserId }) {
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
              className={`p-3 border rounded-lg ${
                p.userId === ownerUserId
                  ? "bg-yellow-50 border-yellow-300 shadow-sm"
                  : "bg-gray-50"
              }`}
            >
              <p className="flex items-center gap-2 font-bold text-sm">
                {p.userId === ownerUserId ? (
                  <>
                    <span className="text-2xl leading-none">👑</span>
                    <span className="text-yellow-700">방장</span>
                  </>
                ) : (
                  <>사용자 ID: {p.userId}</>
                )}
              </p>

              <p className="text-xs text-gray-600">
                참여 시각: {formatDateTime(p.joinedAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
