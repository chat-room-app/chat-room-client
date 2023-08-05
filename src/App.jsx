import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import JoinChatCard from "./pages/JoinChat";
import ChatRoom from "./pages/ChatRoom";
import { io } from "socket.io-client";
export const config = {
  endpoint: `http://localhost:8080`,
};

const socket = io.connect(config.endpoint);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinChatCard socket={socket} />} />
        <Route path="/chat" element={<ChatRoom socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
