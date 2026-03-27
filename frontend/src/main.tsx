import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="w-screen max-w-full overflow-x-hidden min-h-screen bg-[#f0f0f0]">
      <App />
    </div>
  </React.StrictMode>,
);
