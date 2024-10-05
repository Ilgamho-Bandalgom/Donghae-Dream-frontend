import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const checkLoginStatus = () => {
  // 세션이 유지되어 있는지 확인하는 로직
  // 예: localStorage나 sessionStorage에서 토큰 확인
  const token = localStorage.getItem("token");
  return !!token; // 토큰이 있으면 true, 없으면 false 반환
};

const checkSurveyStatus = () => {
  // 설문조사 결과가 존재하는지 확인하는 로직
  // 예: localStorage에서 설문 결과 확인
  const surveyResult = localStorage.getItem("surveyResult");
  return !!surveyResult; // 설문 결과가 있으면 true, 없으면 false 반환
};

const Me = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSurvey, setSurvey] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = checkLoginStatus();
    const survey = checkSurveyStatus();
    setIsLoggedIn(loggedIn);
    setSurvey(survey);

    if (!loggedIn) {
      navigate("/login");
    } else if (!survey) {
      navigate("/survey");
    } else {
      // 로그인되어 있고 설문조사도 완료했으면 /info로 이동
      navigate("/info");
    }
  }, [navigate]);

  // 이 컴포넌트는 실제로 아무것도 렌더링하지 않습니다.
  // 모든 로직은 useEffect에서 처리되며, 적절한 페이지로 리다이렉트됩니다.
  return null;
};

export default Me;
