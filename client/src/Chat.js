import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:3001");

function Chat() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = () => {
    if (message !== "") {
      const msgData = {
        text: message,
        time: new Date().toLocaleTimeString()
      };
      socket.emit("send_message", msgData);
      setMessageList([...messageList, msgData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div>
      <h2>चॅट</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="तुमचा मेसेज लिहा"
      />
      <button onClick={sendMessage}>पाठवा</button>

      <div>
        <h3>मेसेजेस:</h3>
        {messageList.map((msg, index) => (
          <p key={index}>{msg.time} - {msg.text}</p>
        ))}
      </div>
    </div>
  );
}

export default Chat;
