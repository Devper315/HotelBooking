import { Link } from 'react-router-dom';
import '../../assets/styles/common/Header.css';  // Đảm bảo đường dẫn đến tệp CSS đúng
import React, { useState } from 'react';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("User");

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
    };

    return (
        <header>
            <nav className="main-nav">
                <ul className="menu">
                    <li><Link to="/">Trang chủ</Link></li>
                    <li className="dropdown">
                        <Link to="#">Quản lý</Link>
                        <ul className="dropdown-menu">
                            <li><Link to="/admin/dashboard">Dashboard</Link></li>
                            <li><Link to="/admin/manage-room">Quản lý phòng</Link></li>
                            <li><Link to="/admin/manage-booking">Quản lý đặt phòng</Link></li>
                        </ul>
                    </li>
                </ul>
                <div className="auth-buttons">
                    {isLoggedIn ? (
                        <>
                            <span>Xin chào, {username}</span>
                            <button onClick={handleLogout}>Đăng xuất</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Đăng nhập</Link>
                            <Link to="/register">Đăng ký</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
