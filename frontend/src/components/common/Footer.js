import React from 'react';
import '../../assets/styles/common/Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section about">
                    <h1 className="logo-text">Đặt Phòng Khách Sạn</h1>
                    <p>
                        Chào mừng đến với dịch vụ đặt phòng khách sạn của chúng tôi. Chúng tôi nỗ lực để mang đến trải nghiệm tốt nhất cho khách hàng.
                    </p>
                    <div className="contact">
                        <span><i className="fas fa-phone"></i> &nbsp;0377-114-536</span>
                        <span><i className="fas fa-envelope"></i> &nbsp; Devper315@hotelbooking.com</span>
                    </div>
                </div>

                <div className="footer-section links">
                    <h2>Liên kết nhanh</h2>
                    <br />
                    <ul>
                        <li><a href="/">Trang chủ</a></li>
                        <li><a href="/booking">Đặt phòng</a></li>
                        <li><a href="/login">Đăng nhập</a></li>
                        <li><a href="/register">Đăng ký</a></li>
                        <li><a href="/admin/dashboard">Bảng điều khiển Admin</a></li>
                    </ul>
                </div>

                <div className="footer-section social">
                    <h2>Theo dõi chúng tôi</h2>
                    <br />
                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-linkedin"></i></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; 2024 Đặt Phòng Khách Sạn | Thiết kế bởi Phan Văn Thi
            </div>
        </footer>
    );
};

export default Footer;
