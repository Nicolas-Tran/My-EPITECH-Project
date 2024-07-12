import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

const endpoint = "http://localhost:8000";
const socket = io(endpoint, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

function App() {
  const [username, setUsername] = useState("");
  const [channel, setChannel] = useState("");
  const [messages, setMessages] = useState([]);

  // Join a channel
  const join = () => {
    socket.emit("join", channel, username);
  };

  // Leave a channel
  const leave = () => {
    socket.emit("leave", channel, username);
  };

  // Send a message
  const sendMessage = (message) => {
    socket.emit("message", channel, message);
  };

  useEffect(() => {
    socket.on("new user", (username, channel) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${username} has joined the channel ${channel}.`,
      ]);
    });

    socket.on("user left", (username, channel) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${username} has left the channel ${channel}.`,
      ]);
    });

    socket.on("new message", (username, message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        `${username}: ${message}`,
      ]);
    });
  }, []);

  return (
    <div>
      <h1>IRC Chat</h1>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Channel:</label>
        <input
          type="text"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
        />
        <button onClick={join}>Join</button>
        <button onClick={leave}>Leave</button>
      </div>
      <div>
        <label>Message:</label>
        <input
          type="text"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage(e.target.value);
              e.target.value = "";
            }
          }}
        />
      </div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
