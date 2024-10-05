import React, { useEffect, useState } from "react";

// POST로 요청
// JWT  : String 형태의 local storage에 저장된 값
// request : "stamps"

// POST로 응답
// stamps : [
//   {
//     latitude: 33.450701,
//     longitude: 126.570667,
//   }
//  {
//     latitude: 33.450701,
//     longitude: 126.570667,
//   }
// ...
// ]

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [stamps, setStamps] = useState([]);

  const imageSrc_before =
    " https://outgoing-millennium-230.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fce3c643d-4719-4f64-bcd1-f649e2094185%2F6b97a005-70c9-4435-8184-a8d7a02a934f%2Fstamp_before_(1)_(1).png?table=block&id=1168fe6f-62fe-80c9-8cdb-f8e1a37227d9&spaceId=ce3c643d-4719-4f64-bcd1-f649e2094185&width=1630&userId=&cache=v2";
  const imageSrc_after =
    "https://outgoing-millennium-230.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fce3c643d-4719-4f64-bcd1-f649e2094185%2Fd38b9b5e-4ca9-46b6-bf36-ebbb0d0db837%2Fstamp_after_(2).png?table=block&id=1168fe6f-62fe-8023-bfff-d6744941c87c&spaceId=ce3c643d-4719-4f64-bcd1-f649e2094185&width=1730&userId=&cache=v2";

  const RADIUS_THRESHOLD = 50; // 근처로 판단할 반경 (미터)

  // Haversine formula로 두 좌표 간 거리를 계산
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3; // Earth's radius in meters

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in meters
  };

  const updateStampOnServer = async (lat, lon) => {
    try {
      const response = await fetch("/updateStamp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latitude: lat, longitude: lon }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStamps(data.stamps); // 서버로부터 받은 stamps 데이터를 상태로 저장
    } catch (error) {
      console.error("Error updating stamp on server:", error);
    }
  };

  const addMarker = (map, lat, lon, isCustom = null) => {
    const position = new window.kakao.maps.LatLng(lat, lon);

    if (!isCustom) {
      // 기본 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: position,
      });
      marker.setMap(map);
    } else {
      // 커스텀 마커 생성
      let customContent = `
        <div style="
          background-image: url('${imageSrc_before}');
          background-size: contain;
          background-position: center;
          width: 50px;
          height: 50px;
        "></div>
      `;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: customContent,
        yAnchor: 1,
      });

      customOverlay.setMap(map);

      // 클릭 이벤트 설정
      window.kakao.maps.event.addListener(map, "click", (event) => {
        const clickLat = event.latLng.getLat();
        const clickLon = event.latLng.getLng();

        // 클릭한 위치와 마커 위치 간 거리 계산
        const distance = getDistance(lat, lon, clickLat, clickLon);

        if (distance <= RADIUS_THRESHOLD) {
          // 커스텀 오버레이 이미지를 변경
          customContent = `
            <div style="
              background-image: url('${imageSrc_after}');
              background-size: contain;
              background-position: center;
              width: 50px;
              height: 50px;
            "></div>
          `;
          customOverlay.setContent(customContent);

          // 서버에 위치 정보 전송
          updateStampOnServer(lat, lon);
        }
      });
    }
  };

  useEffect(() => {
    const kakao = document.createElement("script");
    kakao.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&libraries=services,clusterer,drawing&autoload=false`;
    kakao.async = true;

    kakao.onload = async () => {
      // 서버에서 실제 stamp 데이터를 가져옴
      // await fetchStampsFromServer();

      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        let options;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            options = {
              center: new window.kakao.maps.LatLng(lat, lon),
              level: 3,
            };

            const map = new window.kakao.maps.Map(mapContainer, options);
            setMap(map);

            // 지도 타입 컨트롤 추가
            const mapTypeControl = new window.kakao.maps.MapTypeControl();
            map.addControl(
              mapTypeControl,
              window.kakao.maps.ControlPosition.TOPRIGHT
            );

            // 줌 컨트롤 추가
            const zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(
              zoomControl,
              window.kakao.maps.ControlPosition.RIGHT
            );

            // 첫 번째 마커: 현재 위치에 기본 마커 추가
            addMarker(map, lat, lon, null);

            // 두 번째 마커: 커스텀 이미지 마커 추가
            addMarker(map, 33.450701, 126.570667, "before");
          });
        } else {
          options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          const map = new window.kakao.maps.Map(mapContainer, options);
          setMap(map);

          // 지도 타입 컨트롤 추가
          const mapTypeControl = new window.kakao.maps.MapTypeControl();
          map.addControl(
            mapTypeControl,
            window.kakao.maps.ControlPosition.TOPRIGHT
          );

          // 줌 컨트롤 추가
          const zoomControl = new window.kakao.maps.ZoomControl();
          map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

          // 기본 좌표에 커스텀 마커 추가
          addMarker(map, 33.450701, 126.570667, null);
        }
      });
    };

    document.head.appendChild(kakao);
  }, [stamps]); // stamps가 변경될 때마다 다시 실행

  return (
    <div
      id="map"
      style={{
        width: "90%",
        height: "82vh",
        margin: "20px auto",
        maxWidth: "1000px",
        borderRadius: "15px",
        border: "3px solid #000",
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

export default KakaoMap;
