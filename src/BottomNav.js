import React from "react";
import { Link } from "react-router-dom";
import "./BottomNav.css";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MapIcon from "@mui/icons-material/Map";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <Link to="/plan">
        <ScheduleIcon className="icon" />
        <div className="label">일정</div>
      </Link>
      <Link to="/map">
        <MapIcon className="icon" />
        <div className="label">스탬프</div>
      </Link>
      <Link to="/rank">
        <LeaderboardIcon className="icon" />
        <div className="label">랭크</div>
      </Link>
      <Link to="/me">
        <AccountCircleIcon className="icon" />
        <div className="label">내 정보</div>
      </Link>
    </div>
  );
};

export default BottomNav;
