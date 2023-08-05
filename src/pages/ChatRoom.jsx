import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddRoom from "../components/AddRoom";
import { config } from "../App";
import axios from "axios";
import RoomCard from "../components/RoomCard";

const ChatRoom = () => {
  const [chatRooms, setChatRooms] = useState([]);
  console.log(chatRooms);

  const getAllChatRooms = async () => {
    const response = await axios.get(config.endpoint + "/rooms");
    setChatRooms(response.data);
  };

  useEffect(() => {
    getAllChatRooms();
  }, []);

  return (
    <div className="flex container h-[80vh] overflow-auto mt-10 border border-4">
      <div className="bg-gray-100 h-full w-1/4 p-4">
        <h2 className="text-2xl text-center font-semibold mb-4">Rooms</h2>
        <hr />
        <AddRoom getAllChatRooms={getAllChatRooms} />
        <hr /> <br />
        <div className="max-h-full overflow-auto">
          <ul>
            {chatRooms.map((room) => (
              <li key={room._id} className="mb-2">
                <RoomCard room={room} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-grow relative bg-red-400 h-full p-4 flex flex-col justify-end">
        <div className="flex mb-1">
          <input
            type="text"
            className="px-2 py-1 border border-gray-300 rounded mr-1"
          />
          <button className="px-4 py-1 bg-blue-500 text-white rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
