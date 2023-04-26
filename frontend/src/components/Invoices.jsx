import React, { useState, useEffect } from "react";
import "./components.css";

function Invoices() {
  // Declare state variables
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [invoice, setInvoice] = useState("");
  const [createdInvoice, setCreatedInvoice] = useState("");
  const [action, setAction] = useState("create");
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
    const endpoint = action === "create" ? "/createInvoice" : "/payInvoice";
    const response = await fetch(`http://localhost:5501/lightning${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, memo, invoice }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(
        `Invoice ${action === "create" ? "created" : "paid"} successfully`
      );
      setMessageType("success");

      if (action === "create") {
        setCreatedInvoice(data.invoice);
      }
    } else {
      setMessage(data.message);
      setMessageType("error");
    }

    setShowForm(false);
    setAmount("");
    setMemo("");
    setInvoice("");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(createdInvoice.payment_request);
    setMessage("Invoice copied to clipboard");
    setMessageType("success");
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>Invoices</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>Action:</label>
          <select value={action} onChange={(e) => setAction(e.target.value)}>
            <option value="create">Create</option>
            <option value="pay">Pay</option>
          </select>
          {action === "create" ? (
            <>
              <label>Amount:</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <label>Memo (optional):</label>
              <input
                type="text"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </>
          ) : (
            <>
              <label>Invoice:</label>
              <input
                type="text"
                value={invoice}
                onChange={(e) => setInvoice(e.target.value)}
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
      {createdInvoice && (
        <div>
          <p>Created Invoice: {createdInvoice.payment_request}</p>
          <button onClick={copyToClipboard}>Copy Invoice</button>
        </div>
      )}
    </div>
  );
}

export default Invoices;
