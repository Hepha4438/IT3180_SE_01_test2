import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Trang chủ</h2>
      <button onClick={() => navigate("/login")}>Đăng nhập</button>
      <button onClick={() => navigate("/register")}>Đăng ký</button>
    </div>
  );
}

export default Home;
