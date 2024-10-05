import React, { useEffect, useState } from "react";

const KakaoMap = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
    kakaoMapScript.async = true;

    kakaoMapScript.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const options = {
              center: new window.kakao.maps.LatLng(lat, lon),
              level: 3,
            };

            const newMap = new window.kakao.maps.Map(container, options);
            setMap(newMap);
          });
        } else {
          const options = {
            center: new window.kakao.maps.LatLng(33.45, 126.57),
            level: 3,
          };

          const newMap = new window.kakao.maps.Map(container, options);
          setMap(newMap);
        }
      });
    };

    document.head.appendChild(kakaoMapScript);
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "90%",
        height: "82vh",
        margin: "20px auto",
        maxWidth: "1000px",
        borderRadius: "15px",
        border: "5px solid #000000", // Change the thickness to 3px and color to a custom color (e.g., #ff5733)
        overflow: "hidden",
      }}
    >
      <style>
        {`
          #map {
            height: 100%;
          }
        `}
      </style>
    </div>
  );
};

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
