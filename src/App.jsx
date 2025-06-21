import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Welcome-Login/Welcome";
import Login from "./Welcome-Login/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
