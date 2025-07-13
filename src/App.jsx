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
import KadrViewScores from "./Kadr/ViewScores";
import AttackConditions from "./Kadr/AttackConditions";
import Take from "./Kadr/Take";
import Give from "./Kadr/Give";
import GDP from "./Kadr/GDP";
import Harvest from "./Kadr/Harvest";
import Trade from "./Kadr/Trade";
import UpdateScores from "./Kadr/UpdateScores";
import Watering from "./Kadr/Watering";

// process routes
import PlantProcess from "./Process/PlantProcess";
import FeedingProcess from "./Process/FeedingProcess";
import AttackProcess from "./Process/AttackProcess";
import TransportProcess from "./Process/TransportProcess";
import AttackKing from "./Process/AttackKing";

function App() {
  return (
    <Routes>
      {/* Welcome and Login Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />

      {/* Kadr Routes */}
      <Route path="/kadr" element={<Home />} />
      <Route path="/kadr/scores" element={<KadrViewScores />} />
      <Route path="/kadr/AttackConditions" element={<AttackConditions />} />
      <Route path="/kadr/Take" element={<Take />} />
      <Route path="/kadr/Give" element={<Give />} />
      <Route path="/kadr/GDP" element={<GDP />} />
      <Route path="/kadr/Harvest" element={<Harvest />} />
      <Route path="/kadr/Trade" element={<Trade />} />
      <Route path="/kadr/UpdateScores" element={<UpdateScores />} />
      <Route path="/Kadr/Watering" element={<Watering />} />

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

      {/* Process Routes */}
      <Route path="/cp/PlantProcess" element={<PlantProcess />} />
      <Route path="/cp/FeedingProcess" element={<FeedingProcess />} />
      <Route path="/cp/AttackProcess" element={<AttackProcess />} />
      <Route path="/cp/TransportProcess" element={<TransportProcess />} />
      <Route path="/cp/AttackKing" element={<AttackKing />} />
    </Routes>
  );
}

export default App;
