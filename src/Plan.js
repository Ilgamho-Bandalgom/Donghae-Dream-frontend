import React, { useState } from "react";
import "./Plan.css";

const Plan = () => {
  const [selectedCategory, setSelectedCategory] = useState("restaurant");
  const [selectedItems, setSelectedItems] = useState({});

  const categories = {
    restaurant: [
      { id: 1, name: "한식", location: "서울시 강남구", point: 4.5 },
      { id: 2, name: "양식", location: "서울시 마포구", point: 4.2 },
      { id: 3, name: "중식", location: "서울시 중구", point: 4.0 },
      { id: 4, name: "일식", location: "서울시 서초구", point: 4.7 },
      { id: 5, name: "분식", location: "서울시 종로구", point: 3.8 },
      { id: 6, name: "카페", location: "서울시 용산구", point: 4.3 },
      { id: 7, name: "베이커리", location: "서울시 송파구", point: 4.1 },
    ],
    tourism: [
      { id: 8, name: "산", location: "경기도 가평군", point: 4.8 },
      { id: 9, name: "바다", location: "부산시 해운대구", point: 4.6 },
      { id: 10, name: "박물관", location: "서울시 용산구", point: 4.4 },
      { id: 11, name: "미술관", location: "서울시 종로구", point: 4.2 },
      { id: 12, name: "놀이공원", location: "경기도 용인시", point: 4.5 },
      { id: 13, name: "역사유적지", location: "경주시", point: 4.7 },
      { id: 14, name: "공원", location: "서울시 송파구", point: 4.0 },
    ],
  };

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
          {categories[selectedCategory].map((item) => (
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
    </div>
  );
};

export default Plan;
