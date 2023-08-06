import React, { useState } from "react";

const RoomCard = ({ room, user, handleJoinChatRoom, selectedRoom }) => {
  const [unreadCount, setunreadCount] = useState(0);
 
  if (room.messages.readBy) {
    unreadCount = room.messages.filter(
      (message) => !message.readBy.includes(user)
    ).length;
  }

  const isSelected = selectedRoom && selectedRoom._id === room._id;
  return (
    <div
      className={`bg-white ${
        isSelected && "border-l-4 border-red-500"
      } items-center justify-between flex p-4 mb-5 rounded-lg shadow-lg`}
    >
      <div>
        <h3 className="text-xl">{room.name}</h3>
        <p className="text-sm">{room.members.length} people joined </p>
      </div>
      {user === "all" ? (
        <div>
          <button
            onClick={() => handleJoinChatRoom(room._id)}
            className="bg-[#FE4002] py-2 px-4 rounded-lg flex justify-center items-center"
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="bg-[#FE4002] rounded-full flex justify-center items-center w-10 h-10">
          {unreadCount || 0}
        </div>
      )}
    </div>
  );
};

export default RoomCard;
