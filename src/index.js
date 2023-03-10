import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);