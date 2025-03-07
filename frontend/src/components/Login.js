import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://it3180-se-01-test2-4.onrender.com/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("fullname", data.fullname); // Lưu fullname vào Local Storage
                navigate("/welcome"); // Chuyển đến trang Welcome
            } else {
                alert(data.error || "Sai tên đăng nhập hoặc mật khẩu");
            }
        } catch (error) {
            console.error("Lỗi:", error);
        }
    };

    return (
        <div>
            <h2>Đăng nhập</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
}

export default Login;
