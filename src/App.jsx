import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Kadr/Home";
import Scout from "./Scout/Scout";
import Welcome from "./Welcome-Login/Welcome";
import Login from "./Welcome-Login/Login";
import ViewScores from "./Scout/ViewScores";
import CPHome from "./CP/Home";
import Buy from "./CP/Buy";
import Plant from "./CP/Plant";
import Feeding from "./CP/Feeding";
import Attack from "./CP/Attack";
import Transport from "./CP/Transport";
import CPViewScores from "./CP/ViewScores";

function App() {
  return (
    <Routes>
      {/* Welcome and Login Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />

      {/* Kadr Routes */}
      <Route path="/kadr" element={<Home />} />

      {/* Scout Routes */}
      <Route path="/scout" element={<Scout />} />
      <Route path="/scout/scores" element={<ViewScores />} />

      {/* CP Routes */}
      <Route path="/cp" element={<CPHome />} />
      <Route path="/cp/buy" element={<Buy />} />
      <Route path="/cp/plant" element={<Plant />} />
      <Route path="/cp/feeding" element={<Feeding />} />
      <Route path="/cp/attack" element={<Attack />} />
      <Route path="/cp/transport" element={<Transport />} />
      <Route path="/cp/scores" element={<CPViewScores />} />
    </Routes>
  );
}

export default App;
