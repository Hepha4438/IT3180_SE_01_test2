import React from "react";

function Welcome() {
    const fullName = localStorage.getItem("fullname"); // Lấy full_name từ localStorage

    const handleLogout = () => {
        alert("Đã bấm Đăng xuất");
        console.log("Đã bấm Đăng xuất"); // Kiểm tra xem có chạy không
        localStorage.removeItem("fullname"); // Xóa thông tin đăng nhập
        window.location.href = "/"; // Chuyển về trang Home
    };

    return (
        <div>
            <h2>Chào mừng {fullName}</h2>
            <button onClick={handleLogout}>Đăng xuất</button>
        </div>
    );
}

export default Welcome;
