import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Plan.css";

// POST로 요청
// JWT  : String 형태의 local storage에 저장된 값
// request : "plan"

// POST로 응답
// plan : [
// {
// 이름 : "관광 / 식당 이름"
// 위치 : "관광 / 식당 위치"
// 포인트 : "관광 / 식당 평점"
// }
// ]

// POST로 전달
// JWT : String 형태의 local storage에 저장된 값
// {선택한 곳들의 정보} ...

const Plan = () => {
  const [selectedCategory, setSelectedCategory] = useState("restaurant");
  const [selectedItems, setSelectedItems] = useState({});
  const [planData, setPlanData] = useState([]);

  useEffect(() => {
    // 요청 부분: 서버로부터 plan 데이터를 가져옴
    const fetchPlanData = async () => {
      try {
        const jwt = localStorage.getItem("JWT"); // JWT 가져오기
        const response = await axios.post("YOUR_API_ENDPOINT", {
          JWT: jwt,
          request: "plan",
        });

        // 응답 부분: 서버로부터 받은 plan 데이터를 상태에 저장
        setPlanData(response.data.plan);
      } catch (error) {
        console.error("Error fetching plan data:", error);
      }
    };

    fetchPlanData();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItems((prevState) => {
      const newState = { ...prevState };
      if (newState[item.id]) {
        delete newState[item.id];
      } else {
        newState[item.id] = item;
      }
      console.log(JSON.stringify(newState, null, 2)); // JSON 형식으로 콘솔에 출력
      return newState;
    });
  };

  const sendSelectedItems = async () => {
    try {
      const jwt = localStorage.getItem("JWT");
      await axios.post("YOUR_API_ENDPOINT", {
        JWT: jwt,
        selectedItems: Object.values(selectedItems), // 선택한 곳들의 정보
      });
      console.log("Selected items sent to server:", selectedItems);
    } catch (error) {
      console.error("Error sending selected items:", error);
    }
  };

  return (
    <div className="plan-container">
      <div className="category-buttons">
        <button
          className={selectedCategory === "restaurant" ? "active" : ""}
          onClick={() => setSelectedCategory("restaurant")}
        >
          식당
        </button>
        <button
          className={selectedCategory === "tourism" ? "active" : ""}
          onClick={() => setSelectedCategory("tourism")}
        >
          관광
        </button>
      </div>
      <div className="subcategory-container">
        <div className="subcategory-list">
          {planData
            .filter((item) => item.category === selectedCategory)
            .map((item) => (
              <div
                key={item.id}
                className={`subcategory-item ${
                  selectedItems[item.id] ? "selected" : ""
                }`}
                onClick={() => handleItemClick(item)}
              >
                <h3>{item.name}</h3>
                <p>위치: {item.location}</p>
                <p>평점: {item.point}</p>
              </div>
            ))}
        </div>
      </div>
      <button onClick={sendSelectedItems}>선택한 장소 서버로 보내기</button>
    </div>
  );
};

export default Plan;
