import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Survey.css"; // CSS file with fade-in and fade-out styles
import {
  GroupsOutlined as Groups,
  HailOutlined,
  ParkOutlined,
  LocationCityOutlined as LocationCityOutlinedIcon,
  DirectionsRunOutlined as DirectionsRunOutlinedIcon,
  TrainOutlined as TrainOutlinedIcon,
  AirplanemodeActiveOutlined as AirplanemodeActiveOutlinedIcon,
  NoFoodOutlined as NoFoodOutlinedIcon,
  DoNotDisturbAltOutlined as DoNotDisturbAltOutlinedIcon,
  FamilyRestroomOutlined as FamilyRestroomOutlinedIcon,
  AccessibleOutlined as AccessibleOutlinedIcon,
  ArrowBackIosNewOutlined,
  Bed as BedIcon,
} from "@mui/icons-material"; // Fixed import for BedIcon

//POST로 전달
//JWT : String 형태의 local storage에 저장된 값
//survey: {
// 혼자_단체: "혼자",
// 자연_도시: "자연",
// 정적_활동적: "정적",
// 내국인_외국인: "내국인",
// 채식주의자: true,
// 할랄푸드: true,
// 자녀유무: true,
// 장애유무: true,
// 나이: 22,
// }

const SurveyContainer = ({
  describe,
  icon: Icon,
  onClick,
  isSelected,
  direction,
}) => {
  return (
    <div
      className={`section ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div
        className={`color-fill ${
          direction === "top" ? "fill-from-top" : "fill-from-bottom"
        } ${isSelected ? "active" : ""}`}
      ></div>
      <div className="image">
        <Icon />
        <p>{describe}</p>
      </div>
    </div>
  );
};

const Survey = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [integerInput, setIntegerInput] = useState(""); // Default empty string to avoid "0"
  const [fadeClass, setFadeClass] = useState("fade-in"); // Track fade class
  const [animateContent, setAnimateContent] = useState(false);
  const [clickedSection, setClickedSection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (animateContent) {
      setTimeout(() => {
        setAnimateContent(false);
      }, 3200);
    }
  }, [animateContent]);

  const surveyData = [
    {
      describe: "혼자",
      icon: HailOutlined,
      describe2: "단체",
      icon2: Groups,
    },
    {
      describe: "자연",
      icon: ParkOutlined,
      describe2: "도시",
      icon2: LocationCityOutlinedIcon,
    },
    {
      describe: "정적",
      icon: BedIcon,
      describe2: "활동적",
      icon2: DirectionsRunOutlinedIcon,
    },
    {
      describe: "내국인",
      icon: TrainOutlinedIcon,
      describe2: "외국인",
      icon2: AirplanemodeActiveOutlinedIcon,
    },
    {
      checklists: [
        {
          question: "채식주의자이신가요?",
          icon: NoFoodOutlinedIcon,
        },
        {
          question: "할랄푸드를 드시나요?",
          icon: DoNotDisturbAltOutlinedIcon,
        },
        {
          question: "자녀가 있으신가요?",
          icon: FamilyRestroomOutlinedIcon,
        },
        {
          question: "장애가 있으신가요?",
          icon: AccessibleOutlinedIcon,
        },
      ],
    },
  ];

  const handleSelection = (option, direction) => {
    setFadeClass("fade-out");
    setAnimateContent(true);
    setClickedSection(direction);

    setTimeout(() => {
      setSelectedOptions((prev) => [...prev, option]);

      if (currentPage < surveyData.length - 1) {
        setCurrentPage(currentPage + 1);
        setFadeClass("fade-in");
      } else {
        // Handle completion logic here
        alert(
          "Survey Completed! Selected options: " +
            JSON.stringify(selectedOptions) +
            ", Integer Input: " +
            integerInput
        );
      }
      setClickedSection(null);
    }, 1000);
  };

  const handleBack = () => {
    setFadeClass("fade-out"); // Start fade-out animation

    setTimeout(() => {
      if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
        setFadeClass("fade-in"); // Add fade-in for the previous page
      } else {
        navigate("/me"); // Navigate to /me if on the first page
      }
    }, 1000); // Delay by the same amount as the fade-out duration
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions((prev) => [...prev, value]);
    } else {
      setSelectedOptions((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleIntegerInputChange = (event) => {
    setIntegerInput(event.target.value); // Update integer input
  };

  const handleComplete = () => {
    // localStorage에서 JWT 가져오기
    const jwt = localStorage.getItem("JWT");

    // 선택한 옵션들을 JSON 형식으로 정리
    const surveyResult = {
      jwt: jwt,
      혼자_단체: selectedOptions[0], // 첫번째 선택사항
      자연_도시: selectedOptions[1], // 두번째 선택사항
      정적_활동적: selectedOptions[2], // 세번째 선택사항
      내국인_외국인: selectedOptions[3], // 네번째 선택사항
      채식주의자: selectedOptions.includes("채식주의자이신가요?"),
      할랄푸드: selectedOptions.includes("할랄푸드를 드시나요?"),
      자녀유무: selectedOptions.includes("자녀가 있으신가요?"),
      장애유무: selectedOptions.includes("장애가 있으신가요?"),
      나이: parseInt(integerInput, 10), // 숫자 입력값을 정수형으로 변환
    };

    console.log(surveyResult); // 확인용 콘솔 출력

    // 서버로 POST 요청 보내기
    fetch("https://your-api-endpoint.com/save-survey", {
      method: "POST",
      body: {
        surveyResult,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Survey saved:", data);
        // 성공 시 '/me'로 이동
        navigate("/me");
      })
      .catch((error) => {
        console.error("Error saving survey:", error);
      });
  };

  const renderSurveyPage = () => {
    if (currentPage < surveyData.length - 1) {
      const { describe, icon, describe2, icon2 } = surveyData[currentPage];
      return (
        <>
          <div
            className={`upper-section section ${
              clickedSection === "top" ? "clicked" : ""
            }`}
          >
            <SurveyContainer
              describe={describe}
              icon={icon}
              onClick={() => handleSelection(describe, "top")}
              isSelected={selectedOptions.includes(describe)}
              direction="top"
            />
          </div>
          <div className="vs"></div>
          <div
            className={`lower-section section ${
              clickedSection === "bottom" ? "clicked" : ""
            }`}
          >
            <SurveyContainer
              describe={describe2}
              icon={icon2}
              onClick={() => handleSelection(describe2, "bottom")}
              isSelected={selectedOptions.includes(describe2)}
              direction="bottom"
            />
          </div>
        </>
      );
    } else {
      return (
        <div className="survey-container full-screen">
          <div className="header">
            <h1 className="title">체크 리스트</h1>
          </div>
          <div className="checklist-items">
            {surveyData[currentPage].checklists.map((checklist, index) => (
              <div key={index} className="checklist-item">
                <input
                  type="checkbox"
                  className="large-checkbox"
                  value={checklist.question}
                  onChange={handleCheckboxChange}
                />
                <checklist.icon className="large-icon" />
                <span className="question-text">{checklist.question}</span>
              </div>
            ))}
          </div>
          <div className="input-container">
            <label className="age">
              <p>나이를 입력하세요</p>
              <input
                className="input-al"
                type="number"
                value={integerInput}
                onChange={handleIntegerInputChange}
                placeholder=""
              />
            </label>
          </div>
          <div className="footer">
            <button className="complete-button" onClick={handleComplete}>
              완료
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className={`survey-container ${fadeClass} ${
        animateContent ? "animate_content" : ""
      }`}
    >
      {renderSurveyPage()}
      <ArrowBackIosNewOutlined className="back-button" onClick={handleBack} />
    </div>
  );
};

export default Survey;
