import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css";
import { Wave } from "./Wave";

const Start = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  useEffect(() => {
    const logoAnimationDuration = 3000; // Total duration for logo display before moving up
    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        navigate("/map");
      }, 500); // Delay for the transition animation
    }, logoAnimationDuration);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`container ${isTransitioning ? "move-up" : ""}`}>
      <canvas ref={canvasRef}></canvas>
      <div className="logocontainer">
        <div
          className={`DonghaemolImage ${isTransitioning ? "move-up" : ""}`}
        ></div>
      </div>
    </div>
  );
};

export default Start;
