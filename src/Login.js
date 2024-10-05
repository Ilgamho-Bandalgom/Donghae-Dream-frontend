import React, { useEffect, useRef } from "react";
import "./LoginButton.css"; // Import the CSS file for styling
import { Wave } from "./Wave"; // Ensure to import the Wave class

const Login = () => {
  const REACT_APP_REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = `http://localhost:3000/oauth`; // Update with your correct URI if necessary
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const canvasRef = useRef(null);

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const wave1 = new Wave("rgba(0, 123, 255, 0.5)", 0);
    const wave2 = new Wave("rgba(0, 168, 255, 0.5)", 150);
    const wave3 = new Wave("rgba(0, 200, 255, 0.5)", 300);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      wave1.resize(canvas.width, canvas.height);
      wave2.resize(canvas.width, canvas.height);
      wave3.resize(canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      wave1.draw(ctx);
      wave2.draw(ctx);
      wave3.draw(ctx);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="login-container">
      <canvas ref={canvasRef} className="wave-canvas"></canvas>
      <div className="login-content">
        <div className="logo"></div>
        <button className="kakao-login-button" onClick={handleLogin}></button>
      </div>
    </div>
  );
};

export default Login;
