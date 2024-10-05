import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const checkLoginStatus = () => {
  // 세션이 유지되어 있으면
  return false;
};

const checkSurveyStatus = () => {
  // 설문조사를 한 결과가 존재하면
  return false;
};

function Information() {
  // 개인정보 띄우기
}

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
    }
    if (loggedIn && !survey) {
      navigate("/survey");
    }
  }, [navigate]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      {isLoggedIn && isSurvey ? (
        <div>
          <button onClick={handleLogout}>로그아웃</button>
          <Information></Information>
        </div>
      ) : (
        <p>다시 시도해주세요</p>
      )}
    </div>
  );
};

export default Me;
