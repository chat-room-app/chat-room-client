import React, { useState } from "react";
import axios from "axios";
import { config } from "../App";

const AddRoom = ({ getAllChatRooms }) => {
  const [roomName, setRoomName] = useState("");
  const addRoom = async () => {
    const userId = localStorage.getItem("userId")
    const res = await axios.post(config.endpoint + "/rooms", {
      name: roomName,
      userId: userId
    });
    getAllChatRooms();
  };
  return (
    <div className="flex items-center justify-around">
      <input
        onChange={(e) => setRoomName(e.target.value)}
        value={roomName}
        type="text"
        className="w-3/4 px-3 py-2 m-4 border border-gray-300 rounded-lg focus:outline-none focus:border-[#FE4002]"
      />
      <button
        onClick={addRoom}
        className=" bg-[#FE4002] hover:bg-red-400 text-white py-2 px-4 rounded-lg focus:outline-none"
      >
        +
      </button>
    </div>
  );
};

export default AddRoom;
