import React, { useEffect, useState } from "react";
import KakaoMap from "./KakaoMap";

const Map = () => {
  return (
    <div style={{ margin: 10 }}>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginLeft: "40px",
          marginBottom: "10px",
          marginTop: "10px", // Consider reducing this value
          padding: "10px 15px",
          backgroundColor: "rgb(162, 196, 255)",
          borderRadius: "15px",
          display: "block",
          width: "90%",
          maxWidth: "1000px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          textAlign: "left",
          margin: "0 auto",
        }}
      >
        point
      </div>
      <KakaoMap />
    </div>
  );
};

export default Map;
