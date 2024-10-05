import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import "./Info.css";

// POST로 요청
// JWT  : String 형태의 local storage에 저장된 값
// request : "info"

// POST로 응답
//  : [
// {이름: "강민주"},
// {나이: 22},
// {정적_활동적: "정적"},
// {자연_도시: "도시"},
// {혼자_단체: "혼자"},
// {내국인_외국인: "내국인"},
// {자녀유무: true},
// {채식주의자: true},
// {할랄푸드: false},
// {장애유무: true},
//]

const Info = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 요청 부분
    const fetchData = async () => {
      try {
        const jwt = localStorage.getItem("JWT"); // JWT 가져오기
        const response = await axios.post("YOUR_API_ENDPOINT", {
          JWT: jwt,
          request: "info",
        });

        // 응답 부분
        setUserInfo(response.data); // 서버로부터 받은 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }

  const {
    이름,
    나이,
    정적_활동적,
    자연_도시,
    혼자_단체,
    내국인_외국인,
    자녀유무,
    채식주의자,
    할랄푸드,
    장애유무,
  } = userInfo;

  const 특징 = [
    자녀유무 ? "자녀 있음" : null,
    채식주의자 ? "채식주의자" : null,
    할랄푸드 ? "할랄푸드" : null,
    장애유무 ? "장애 있음" : null,
  ].filter(Boolean);

  const handleEditClick = () => {
    navigate("/survey");
  };

  return (
    <div className="info-container">
      <div className="info-header">
        <h2 className="info-title">내 정보</h2>
        <IconButton onClick={handleEditClick} aria-label="edit">
          <EditIcon />
        </IconButton>
      </div>
      <ul className="info-list">
        <li className="info-item">
          <span>이름:</span> {이름}
        </li>
        <li className="info-item">
          <span>나이:</span> {나이}
        </li>
        <li className="info-item">
          <span>정적 / 활동적:</span> {정적_활동적}
        </li>
        <li className="info-item">
          <span>선호 공간:</span> {자연_도시}
        </li>
        <li className="info-item">
          <span>여행 유형:</span> {혼자_단체}
        </li>
        <li className="info-item">
          <span>거주:</span> {내국인_외국인}
        </li>
        {특징.length > 0 && (
          <li className="info-item">
            <span>특징:</span>
            {특징.map((item, index) => (
              <span key={index} className="feature-tag">
                {item}
              </span>
            ))}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Info;
