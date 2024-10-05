import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// POST로 요청
// JWT  : String 형태의 local storage에 저장된 값
// request : "info"

//-> 응답이 NULL이면 설문조사 페이지로 넘어감

// POST로 응답
// info : [
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

const checkLoginStatus = () => {
  // JWT가 localStorage에 있는지 확인
  const jwt = localStorage.getItem("JWT");
  return !!jwt; // JWT가 있으면 true, 없으면 false 반환
};

const Me = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = checkLoginStatus();
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      navigate("/login");
    } else {
      // 로그인되어 있으면 서버에 info 요청
      const fetchInfo = async () => {
        try {
          const jwt = localStorage.getItem("JWT");
          const response = await axios.post("YOUR_API_ENDPOINT", {
            JWT: jwt,
            request: "info",
          });

          // 응답이 NULL이면 Survey 화면으로 이동
          if (!response.data || response.data === null) {
            navigate("/survey");
          } else {
            // 응답이 있으면 /info로 이동
            navigate("/info");
          }
        } catch (error) {
          console.error("Error fetching info:", error);
          navigate("/survey"); // 오류 발생 시 Survey 화면으로 이동
        }
      };

      fetchInfo();
    }
  }, [navigate]);

  // 이 컴포넌트는 실제로 아무것도 렌더링하지 않습니다.
  // 모든 로직은 useEffect에서 처리되며, 적절한 페이지로 리다이렉트됩니다.
  return null;
};

export default Me;
