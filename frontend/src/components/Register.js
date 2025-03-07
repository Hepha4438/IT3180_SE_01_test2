import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
      e.preventDefault();

      const response = await fetch("https://it3180-se-01-test2-4.onrender.com/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password, email, fullName, phoneNumber, role: "USER" }),
      });

      if (response.ok) {
          const data = await response.json(); // Lấy dữ liệu người dùng mới từ phản hồi
          if (data.fullName) {
              localStorage.setItem("fullname", data.fullName); // Lưu fullname vào Local Storage
              alert("Đăng ký thành công!");
              navigate("/welcome");
          } else {
              alert("Dữ liệu trả về không hợp lệ!");
          }
      } else {
          const errorData = await response.json();
          alert(errorData.error || "Đăng ký thất bại!");
      }
  };

  return (
    <div className="container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" placeholder="Họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input type="text" placeholder="Số điện thoại" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <button type="submit">Đăng ký</button>
      </form>
    </div>
  );
}

export default Register;
