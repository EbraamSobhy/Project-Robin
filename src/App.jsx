import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Kadr/Home";
// import Scout from "./Scout/Scout";
// import Welcome from "./Welcome-Login/Welcome";
// import Login from "./Welcome-Login/Login";
// import ViewScores from "./Scout/ViewScores";


function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/" element={<Scout />} /> */}
      {/* <Route path="/" element={<ViewScores />} /> */}
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
