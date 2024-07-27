import React from 'react';
import '../../assets/styles/admin/AdminDashboard.css';

const stats = {
    totalRooms: 10,
    availableRooms: 7,
    bookedRooms: 3,
    totalBookings: 20,
    totalRevenue: 2000
};

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard-container">
            <h1>Tổng quan</h1>
            <ul>
                <li>
                    <span>Tổng số phòng:</span> {stats.totalRooms}
                </li>
                <li>
                    <span>Phòng còn trống:</span> {stats.availableRooms}
                </li>
                <li>
                    <span>Phòng đã đặt:</span> {stats.bookedRooms}
                </li>
                <li>
                    <span>Tổng số lượt đặt phòng:</span> {stats.totalBookings}
                </li>
                <li>
                    <span>Tổng doanh thu:</span> ${stats.totalRevenue}
                </li>
            </ul>
        </div>
    );
};

export default AdminDashboard;
