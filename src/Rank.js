import React from "react";
import "./Rank.css";

const Rank = () => {
  const myRank = {
    rank: 15,
    name: "사용자",
    points: 1250,
  };

  const rankings = [
    { rank: 1, name: "강민주", points: 5000 },
    { rank: 2, name: "김지현", points: 4800 },
    { rank: 3, name: "정윤아", points: 4600 },
    { rank: 4, name: "강성우", points: 4400 },
    { rank: 5, name: "홍길동", points: 4200 },
    // ... 더 많은 랭킹 데이터 추가
  ];

  return (
    <div className="rank-container">
      <div className="my-rank">
        <h1>내 랭킹 정보</h1>
        <div className="my-rank-info">
          <div className="my-rank-item">
            <span className="my-rank-label">랭킹</span>
            <span className="my-rank-value">{myRank.rank}위</span>
          </div>
          <div className="my-rank-item">
            <span className="my-rank-label">포인트</span>
            <span className="my-rank-value">{myRank.points}</span>
          </div>
        </div>
      </div>
      <div className="rankings-container">
        <div className="rankings-list">
          {rankings.map((item, index) => (
            <div key={index} className="ranking-item">
              <span className="rank">{item.rank}</span>
              <span className="name">{item.name}</span>
              <span className="points">{item.points}점</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rank;
