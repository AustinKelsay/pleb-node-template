import React, { useState, useEffect } from "react";
import "./components.css";

function Peers() {
  // Declare state variables
  const [showForm, setShowForm] = useState(false);
  const [pubkey, setPubkey] = useState("");
  const [host, setHost] = useState("");
  const [action, setAction] = useState("add");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  // clear success / error messages after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send POST request to backend
    const endpoint = action === "add" ? "/addPeer" : "/removePeer";
    const response = await fetch(`http://localhost:5501/lightning${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pubkey, host }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(`Peer ${action === "add" ? "added" : "removed"} successfully`);
      setMessageType("success");
    } else {
      setMessage(data.message);
      setMessageType("error");
    }

    setShowForm(false);
    setHost("");
    setPubkey("");
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>Peers</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>Action:</label>
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="add">Add</option>
            <option value="remove">Remove</option>
          </select>
          <label>Pubkey:</label>
          <input
            type="text"
            value={pubkey}
            onChange={(e) => setPubkey(e.target.value)}
          />
          {action === "add" && (
            <>
              <label>Host:</label>
              <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </>
          )}
          <button type="submit">Submit</button>
        </form>
      )}
      {message && (
        <div
          className={
            messageType === "success" ? "success-message" : "error-message"
          }
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default Peers;
