import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Message = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const { socket, email } = location.state; // Retrieve the socket and email from the previous page

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const messageData = { email, message };
      socket.emit("send_message", messageData); // Send message via Socket.IO
      setMessages((prevMessages) => [...prevMessages, messageData]); // Add message to local state
      setMessage(""); // Clear input
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        Real-Time Messaging
      </h2>
      <div className="mb-6">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.email}: </strong>
            {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Message;
