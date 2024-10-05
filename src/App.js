import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import BottomNav from "./BottomNav";
import Map from "./Map";
import Rank from "./Rank";
import Plan from "./Plan";
import Me from "./Meinfo";
import Login from "./Login";
import Redirect from "./Redirect";
import Survey from "./Survey";
import Start from "./Start";

function Layout() {
  const location = useLocation();

  return (
    <div>
      {/* 현재 경로가 '/survey' 또는 '/'가 아닐 때만 BottomNav를 표시 */}
      {location.pathname !== "/survey" && location.pathname !== "/" && (
        <BottomNav />
      )}

      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/map" element={<Map />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/rank" element={<Rank />} />
        <Route path="/me" element={<Me />} />
        <Route path="*" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth" element={<Redirect />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
