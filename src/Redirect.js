import { useEffect } from "react";

const Redirect = () => {
  useEffect(() => {
    const clientId = "0c5227c74ac09e407dffe76c6987501f"; // 카카오 REST API 키
    const redirectUri = "http://3.26.204.10:3000/auth/kakao/callback"; // 리다이렉트 URI

    // 카카오 인증 URL 구성
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;

    console.log("Redirecting to Kakao OAuth URL");
    console.log(kakaoAuthUrl);

    // 카카오 로그인 페이지로 리다이렉트
    window.location.href = kakaoAuthUrl;
  }, []);

  return <div className="redirect-overlay">Redirecting...</div>;
};

export default Redirect;
