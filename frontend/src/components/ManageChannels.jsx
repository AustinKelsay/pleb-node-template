import React, { useState, useEffect } from "react";
import axios from "axios";
import "./components.css";

function ManageChannels() {
  const [showForm, setShowForm] = useState(false);
  const [pubkey, setPubkey] = useState("");
  const [amount, setAmount] = useState("");
  const [channelId, setChannelId] = useState("");
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

  // Convert hex string to base64
  function hexToBase64(hexstring) {
    return window.btoa(
      hexstring
        .match(/\w{2}/g)
        .map(function (a) {
          return String.fromCharCode(parseInt(a, 16));
        })
        .join("")
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const encodedPubkey = action === "add" ? hexToBase64(pubkey) : "";

    // Send POST request to backend
    const endpoint =
      action === "add"
        ? "http://localhost:5501/lightning/openChannel"
        : "http://localhost:5501/lightning/closeChannel";

    try {
      await axios.post(endpoint, {
        pubkey: encodedPubkey,
        amount: action === "add" ? amount : "",
        channelId: action === "remove" ? channelId : "",
      });

      setMessage(
        `Channel ${action === "add" ? "opened" : "closed"} successfully`
      );
      setMessageType("success");
    } catch (err) {
      setMessage(err.response.data.message);
      setMessageType("error");
    }

    setShowForm(false);
    setAmount("");
    setPubkey("");
    setChannelId("");
  };

  return (
    <div>
      {/* Button to toggle the form */}
      <button onClick={() => setShowForm(!showForm)}>Manage Channels</button>

      {/* Form to input channel details */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>Action:</label>
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="add">Add</option>
            <option value="remove">Remove</option>
          </select>
          {action === "add" ? (
            <>
              <label>Node Pubkey:</label>
              <input
                type="text"
                value={pubkey}
                onChange={(e) => setPubkey(e.target.value)}
              />
              <label>Funding Amount:</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </>
          ) : (
            <>
              <label>Channel ID:</label>
              <input
                type="text"
                value={channelId}
                onChange={(e) => setChannelId(e.target.value)}
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

export default ManageChannels;
