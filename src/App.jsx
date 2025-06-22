import React from "react";
import { Routes, Route } from "react-router-dom";
import Scout from "./Scout/Scout";
// import Welcome from "./Welcome-Login/Welcome";
// import Login from "./Welcome-Login/Login";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} /> */}
      <Route path="/" element={<Scout />} />
    </Routes>
  );
}

export default App;
