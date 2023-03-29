import React from "react";
import "./components.css";

const Channels = ({ channels }) => {
  return (
    <div className="channels">
      <h2>Channels</h2>
      <table>
        <thead>
          <tr>
            <th>Channel ID</th>
            <th>Local balance</th>
            <th>Remote balance</th>
            <th>Capacity</th>
          </tr>
        </thead>
        <tbody>
          {channels?.map((c) => (
            <tr key={c.chan_id}>
              <td>{c.chan_id}</td>
              <td>{c.local_balance}</td>
              <td>{c.remote_balance}</td>
              <td>{c.capacity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Channels;
