import React, { useState } from "react";
import "./components.css";

function OpenChannel() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      {/* Button to toggle the form */}
      <button onClick={() => setShowForm(!showForm)}>Open Channel</button>

      {/* Form to input channel details */}
      {showForm && (
        <form>
          <label>Node Pubkey:</label>
          <input type="text" />
          <label>Funding Amount:</label>
          <input type="text" />
          <button type="submit">Submit</button>
        </form>
      )}

      {/* Display success or error message */}
      <div className="success-message">...</div>
    </div>
  );
}

export default OpenChannel;
