import React from 'react';
import '../../assets/styles/common/Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section about">
                    <h1 className="logo-text"><span>Hotel</span>Booking</h1>
                    <p>
                        Welcome to our hotel booking service. We strive to provide the best experience for our customers.
                    </p>
                    <div className="contact">
                        <span><i className="fas fa-phone"></i> &nbsp; 123-456-789</span>
                        <span><i className="fas fa-envelope"></i> &nbsp; info@hotelbooking.com</span>
                    </div>
                </div>

                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <br />
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/booking">Booking</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                        <li><a href="/admin/dashboard">Admin Dashboard</a></li>
                    </ul>
                </div>

                <div className="footer-section social">
                    <h2>Follow us</h2>
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
                &copy; 2024 HotelBooking | Designed by You
            </div>
        </footer>
    );
};

export default Footer;
