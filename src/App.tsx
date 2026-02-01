import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    async function fetchStatus() {
      try {
        const msg = await invoke("get_status");
        setStatus(msg as string);
      } catch (e) {
        setStatus("Error connecting to backend");
      }
    }
    fetchStatus();
  }, []);

  return (
    <main className="container">
      <h1>Global Vim-Like Navi</h1>
      
      <div className="card">
        <h2>Status</h2>
        <p className="status-text">{status}</p>
      </div>

      <div className="instructions">
        <h3>Mappings</h3>
        <ul>
          <li><strong>Caps + H</strong> → Left</li>
          <li><strong>Caps + J</strong> → Down</li>
          <li><strong>Caps + K</strong> → Up</li>
          <li><strong>Caps + L</strong> → Right</li>
        </ul>
        <p className="note">Note: CapsLock acts as a modifier. Pressing it alone still toggles CapsLock.</p>
      </div>
    </main>
  );
}

export default App;