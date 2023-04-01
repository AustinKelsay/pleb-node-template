import React, { useState, useEffect } from "react";
import Channels from "./components/Channels";
import AddPeer from "./components/AddPeer";
import OpenChannel from "./components/OpenChannel";
import "./App.css";

function App() {
  const [pubkey, setPubkey] = useState(null);
  const [alias, setAlias] = useState(null);
  const [channelBalance, setChannelBalance] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [channels, setChannels] = useState([]);

  const fetchNodeInfo = async () => {
    const response = await fetch("http://localhost:5501/lightning");

    const data = await response.json();

    console.log(data);

    if (data.info && data.balances && data.channels) {
      setPubkey(data.info.identity_pubkey);
      setAlias(data.info.alias);
      setChannelBalance(data.balances.channelBalance.balance);
      setWalletBalance(data.balances.walletBalance.total_balance);
      setChannels(data.channels);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>pleb-node-lnd</h1>
      </header>

      {/* Connect button */}
      <button onClick={fetchNodeInfo}>Connect to your node</button>

      {/* Connected */}
      <h2>Connected to {pubkey}</h2>

      <h3>Node alias: {alias}</h3>

      {/* Balances */}
      <div className="balances">
        <div className="balance">
          <h3>Onchain balance</h3>
          <p>{walletBalance} sats</p>
        </div>
        <div className="balance">
          <h3>Lightning balance</h3>
          <p>{channelBalance} sats</p>
        </div>
      </div>

      {/* Add peer */}
      <AddPeer />

      {/* Open channel */}
      <OpenChannel />

      {/* channels */}
      <Channels channels={channels} />
    </div>
  );
}

export default App;
