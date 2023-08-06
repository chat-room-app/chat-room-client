import React, { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../App";
import RoomCard from "./RoomCard";
import { useNavigate } from "react-router-dom";

const AvailableChatRoomList = ({ socket }) => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([]);

  const fetchChatRooms = async () => {
    const res = await axios.get(config.endpoint + "/rooms");
    setChatRooms(res.data);
  };

  const joinChatRoom = async (chatRoomId) => {
    let userId = localStorage.getItem("userId");
    try {
      const res = await axios.post(
        `${config.endpoint}/rooms/${chatRoomId}/join`,
        { userId }
      );
      socket.emit("joinRoom", chatRoomId);
      navigate("/chat", { replace: true });
    } catch (error) {
      console.error("Error joining chat room:", error);
    }
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 bg-slate-300 h-screen">
      <h2 className="text-2xl text-center font-semibold mb-4">
        List of Available Chat Rooms
      </h2>
      <div className="w-1/2">
        {chatRooms.map((room) => (
          <RoomCard
            key={room._id}
            room={room}
            user="all"
            handleJoinChatRoom={joinChatRoom}
          />
        ))}

        <button
          onClick={() => navigate("/chat", { replace: true })}
          className="border-4 p-4 rounded-lg border-[#FE4002]"
        >
          Skip to the chat room
        </button>
      </div>
    </div>
  );
};

export default AvailableChatRoomList;
