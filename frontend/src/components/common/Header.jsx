import { Link } from 'react-router-dom';
import '../../assets/styles/common/Header.css';  // Đảm bảo đường dẫn đến tệp CSS đúng
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchAllCustomer } from '../../services/ProfileAPI';
import ChatWindow from '../customer/ChatWindow';

const Header = () => {
  const { isLoggedIn, userInfo, logout } = useContext(AuthContext);
  const [showCustomerList, setShowCustomerList] = useState(false);
  const [customerList, setCustomerList] = useState([])
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    const getAllCustomer = async () => {
      const customerData = await fetchAllCustomer()
      setCustomerList(customerData)
    }
    if (userInfo.role === 'ADMIN') getAllCustomer()
  }, [userInfo.role])

  const handleShowCustomerList = () => {
    setShowCustomerList(!showCustomerList)
  }

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setIsChatOpen(true)
    setShowCustomerList(false);
  };


  return (
    <header>
      <nav className="main-nav">
        <ul className="menu">
          <li><Link to="/">Trang chủ</Link></li>
          {userInfo.role === 'ADMIN' && (
            <>
              <li className="dropdown">
                <Link to="#">Quản lý</Link>
                <ul className="dropdown-menu">
                  <li><Link to="/admin/dashboard">Tổng quan</Link></li>
                  <li><Link to="/admin/manage-hotel">Danh sách khách sạn</Link></li>
                  <li><Link to="/admin/manage-booking">Danh sách đặt phòng</Link></li>
                </ul>
              </li>
              <li className="customer-menu">
                <button onClick={() => handleShowCustomerList()}>
                  Chat với khách hàng
                </button>
                {showCustomerList &&
                  <ul className="customer-list">
                    {customerList.map(customer => (
                      <li key={customer.id}>
                        <button onClick={() => handleCustomerClick(customer)}>
                          {customer.fullName}
                        </button>
                      </li>
                    ))}
                  </ul>
                }
              </li>
            </>
          )}
          {userInfo.role === 'CUSTOMER' && (
            <>
              <li className="dropdown">
                <Link to="customer/my-bookings">Xem phòng đã đặt</Link>
              </li>
            </>
          )}
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
            </div>
          ) : (
            <>
              <Link to="/login">Đăng nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </>
          )}
        </div>
      </nav>
      {isChatOpen && <ChatWindow
        onClose={() => setIsChatOpen(false)}
        recipient={selectedCustomer}/>}
    </header>
  );
};

export default Header;
