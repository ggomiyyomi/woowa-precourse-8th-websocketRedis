export default function RoomItem({ room, onClick }) {
  return (
    <div
      onClick={() => onClick(room.gcrId)}
      className="
        border p-4 mt-3 rounded-xl cursor-pointer bg-white shadow-sm
        hover:bg-gray-50 hover:shadow transition 
      "
    >
      <h3 className="text-lg font-semibold">{room.roomTitle}</h3>
      <p className="text-gray-600 text-sm mt-1">{room.roomDescription}</p>

      <p className="text-sm text-gray-500 mt-2">정원: {room.maxUserCnt}</p>
    </div>
  );
}
