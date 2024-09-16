import { Link } from 'react-router-dom';
import '../../assets/styles/common/Header.css';  // Đảm bảo đường dẫn đến tệp CSS đúng
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
    const {isLoggedIn, userInfo, logout} = useContext(AuthContext)
    return (
      <header>
        <nav className="main-nav">
          <ul className="menu">
            <li><Link to="/">Trang chủ</Link></li>
            <li className="dropdown">
              {userInfo.role === 'ADMIN' ? (
                <>
                  <Link to="#">Quản lý</Link>
                  <ul className="dropdown-menu">
                    <li><Link to="/admin/dashboard">Tổng quan</Link></li>
                    <li><Link to="/admin/manage-hotel">Danh sách khách sạn</Link></li>
                    <li><Link to="/admin/manage-booking">Danh sách đặt phòng</Link></li>

                  </ul>
                </>
              ) : (
                <>
                <Link to="#">Khách hàng</Link>
                  <ul className="dropdown-menu">
                  <li><Link to="/customer/my-bookings">Đơn đặt phòng của tôi</Link></li>
                  <li><Link to="/customer/see-rooms">Xem phòng</Link></li>
                  </ul>
                </>
              )}
            </li>
          </ul>
          <div className="auth-buttons">
            {isLoggedIn ? (
              <div className="user-menu">
                <span className="user-name">Xin chào, {userInfo.fullName}</span>
                <ul className="user-dropdown">
                  <li><Link to="/profile/my-info">Thông tin cá nhân</Link></li>
                  <li><Link to="/profile/change-password">Đổi mật khẩu</Link></li>
                </ul>
                <button onClick={logout}>Đăng xuất</button>
              </div>) : (
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
