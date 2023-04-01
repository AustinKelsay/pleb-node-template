import React, { useState } from "react";
import axios from "axios";
import "./components.css";

function OpenChannel() {
  const [showForm, setShowForm] = useState(false);
  const [pubkey, setPubkey] = useState("");
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

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

    const encodedPubkey = hexToBase64(pubkey);

    // Send POST request to backend
    axios
      .post("http://localhost:5501/lightning/openChannel", {
        pubkey: encodedPubkey,
        amount,
      })
      .then((res) => {
        setShowForm(false);
        setSuccessMessage("Channel opened successfully");
        setAmount("");
        setPubkey("");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* Button to toggle the form */}
      <button onClick={() => setShowForm(!showForm)}>Open Channel</button>

      {/* Form to input channel details */}
      {showForm && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Node Pubkey:</label>
          <input type="text" onChange={(e) => setPubkey(e.target.value)} />
          <label>Funding Amount:</label>
          <input type="text" onChange={(e) => setAmount(e.target.value)} />
          <button type="submit">Submit</button>

          {/* Display success or error message */}
          <div className="success-message">{successMessage}</div>
        </form>
      )}
    </div>
  );
}

export default OpenChannel;
