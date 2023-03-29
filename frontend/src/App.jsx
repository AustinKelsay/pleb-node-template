import React from "react";
import Channels from "./components/Channels";
import AddPeer from "./components/AddPeer";
import OpenChannel from "./components/OpenChannel";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>pleb-node-lnd</h1>
      </header>

      {/* Connect button */}
      <button>Connect to your node</button>

      {/* Connected */}
      <h2>Connected to ...</h2>

      {/* Balances */}
      <div className="balances">
        <div className="balance">
          <h3>Onchain balance</h3>
          <p>... sats</p>
        </div>
        <div className="balance">
          <h3>Lightning balance</h3>
          <p>... sats</p>
        </div>
      </div>

      {/* Add peer */}
      <AddPeer />

      {/* Open channel */}
      <OpenChannel />

      {/* channels */}
      <Channels />
    </div>
  );
}

export default App;
