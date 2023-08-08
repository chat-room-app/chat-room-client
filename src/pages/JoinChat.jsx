import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AvailableChatRoomList from "../components/AvailableChatRoomList";
import axios from "axios";
import { config } from "../App";

const JoinChatCard = ({ socket }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [showRoomList, setShowRoomList] = useState(false);

  const postUser = async () => {
    const res = await axios.post(config.endpoint + "/users", {
      username: name,
    });
    const user = res.data;
    localStorage.setItem("userId", user._id);
  };

  const handleJoinChat = () => {
    if (name.trim() !== "") {
      // navigate("/chat", { replace: true });
      postUser();

      setShowRoomList(true);
    }
  };

  return (
    <>
      {!showRoomList ? (
        <div className="min-h-screen bg-gray-300 flex items-center justify-center">
          <div className="bg-white rounded-3xl flex items-center flex-col shadow-md p-6 w-1/3 h-[30vh] mx-auto">
            <h2 className="text-2xl font-semibold ">Join Chat</h2>
            <div>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-blue-500"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button
                className="w-full bg-[#FE4002] hover:bg-red-400 text-white py-2 px-4 rounded-md focus:outline-none"
                onClick={handleJoinChat}
              >
                Join Chat Room
              </button>
            </div>
          </div>
        </div>
      ) : (
        <AvailableChatRoomList socket={socket} />
      )}
    </>
  );
};

export default JoinChatCard;
