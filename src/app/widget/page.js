"use client";
import { useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios

export default function FloatingWidget() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  
  useEffect(() => {
    setTimeout(() => setVisible(true), 500);
  }, []);
  
  const handleSend = async(sender) => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender }]);
      const userMessage = inputValue;

      setInputValue("");
      try {
        const response = await axios.post('/api/chatbot', { query: userMessage });
        const botMessage = response.data.response; // Adjust based on your API response structure
        setMessages((prevMessages) => [...prevMessages, { text: botMessage, sender: 'bot' }]);
      } catch (error) {
        console.error("Error calling the API:", error);
      }
    
    }
  };
  const getMessageAlignment = (sender) => {
    return sender === 'user' ? 'right' : 'left'; // Adjust based on sender
  };

  return (
    <div>
      <h3 className="p-6">Welcome</h3>
      {visible && (
        <div>
          <div className="p-4">
            {messages.map((msg, index) => (
              <div key={index} style={{ textAlign: getMessageAlignment(msg.sender) }}>
                {msg.text}
              </div>
            ))}
          </div>
          <div style={{ position: 'fixed', bottom: 10, left: 10, right: 10,  padding: '10px', boxShadow: '0 -2px 5px rgba(0,0,0,0.1)', display:'flex',justifyContent:'space-evenly' }}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="w-100 mr-4"
            />
            <button onClick={() => handleSend('user')}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
