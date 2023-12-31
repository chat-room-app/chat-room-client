import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddRoom from "../components/AddRoom";
import { config } from "../App";
import axios from "axios";
import RoomCard from "../components/RoomCard";
import MessageList from "../components/MessageList";

const ChatRoom = ({ socket }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  let userId = localStorage.getItem("userId");

  const getAllChatRooms = async () => {
    try {
      const response = await axios.get(
        config.endpoint + "/rooms/user/" + userId
      );
      setChatRooms(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMessagesByRoomId = async () => {
    try {
      if (selectedRoom) {
        const res = await axios.get(
          config.endpoint + "/messages/" + selectedRoom._id
        );
        setMessages(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const markMessagesRead = async () => {
    if (selectedRoom) {
      try {
        const res = axios.put(config.endpoint + "/messages", {
          chatRoomId: selectedRoom._id,
          userId: userId,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const calculateUnreadCount = (room) => {
    if (!room || !room.messages) {
      return 0;
    }

    let unreadCount = 0;
    for (const message of room.messages) {
      if (!message.readBy.includes(userId)) {
        unreadCount++;
      }
    }
    return unreadCount;
  };

  useEffect(() => {
    getAllChatRooms();
  }, []);

  useEffect(() => {
    // Handle incoming newMessage event
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => {
        if (prevMessages === null) {
          return [message];
        } else {
          getAllChatRooms();
          return [...prevMessages, message];
        }
      });
    };
    socket.on("broadcast", handleNewMessage);

    // Clean up the event listener on component unmount
    return () => {
      socket.off("broadcast", handleNewMessage);
    };
  }, [socket]);

  useEffect(() => {
    if (chatRooms.length > 0) {
      setSelectedRoom(chatRooms[0]);
    }
  }, [chatRooms]);

  useEffect(() => {
    getMessagesByRoomId();
  }, [selectedRoom]);

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    markMessagesRead();
  };

  const handleSendMessage = async () => {
    const postData = {
      chatRoomId: selectedRoom._id,
      senderId: userId,
      content: message,
    };
    try {
      const res = await axios.post(config.endpoint + "/messages", postData);
      socket.emit("sendMessage", res.data);
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex container overflow-hidden h-[80vh] mt-10 border-4">
      <div className="bg-gray-100 h-full w-1/4 p-4">
        <h2 className="text-2xl text-center font-semibold mb-4">Rooms</h2>
        <hr />
        <AddRoom getAllChatRooms={getAllChatRooms} socket={socket} />
        <hr /> <br />
        <div className="max-h-full h-[80vh] overflow-auto">
          <ul>
            {chatRooms.map((room) => (
              <li
                key={room._id}
                className={`mb-2 cursor-pointer`}
                onClick={() => handleRoomClick(room)}
              >
                <RoomCard
                  room={room}
                  selectedRoom={selectedRoom}
                  unreadCount={calculateUnreadCount(room)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedRoom && (
        <div className="h-full p-4 flex flex-col">
          <div className="mb-2 sticky top-0 bg-white">
            <h3 className="text-lg font-semibold">{selectedRoom.name}</h3>
          </div>

          <div className="w-[60vw] h-60vh overflow-auto border-t py-4 flex-grow">
            <MessageList messages={messages} userId={userId} />
          </div>

          <div className="mt-2 w-3/4 sticky bottom-0 bg-white p-4">
            <div className="flex mb-1">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                className="px-2 py-1 border focus:outline-[#FE4002] border-gray-300 rounded mr-1 flex-grow"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-1 bg-[#FE4002] text-white rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
