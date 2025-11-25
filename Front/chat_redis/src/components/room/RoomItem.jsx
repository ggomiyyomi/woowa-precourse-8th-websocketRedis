
export default function RoomItem({ room, onClick }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: 10,
        margin: "10px 0",
        cursor: "pointer",
        borderRadius: 8
      }}
      onClick={() => onClick(room.gcrId)}
    >
      <h3>{room.roomTitle}</h3>
      <p>{room.roomDescription}</p>
      <p>정원: {room.maxUserCnt}</p>
    </div>
  );
}