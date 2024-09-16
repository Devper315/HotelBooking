import React, { useEffect, useState } from 'react';
import '../../assets/styles/admin/AdminDashboard.css';
import { fetchBookingStatistical, fetchRoomStatistical } from '../../services/StatisticalAPI';





const AdminDashboard = () => {
    const [stats, setStats] = useState({})
    useEffect(() => {
        const getStatistical = async () => {
            const roomData = await fetchRoomStatistical()
            const bookData = await fetchBookingStatistical()
            setStats({
                totalRooms: roomData.total,
                availableRooms: roomData.available,
                bookedRooms: roomData.booked,
                totalBookings: bookData.totalBooking,
                totalRevenue: bookData.revenue
            })
        };
        getStatistical();
    }, []);
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
                {/* <li>
                    <span>Tổng doanh thu:</span> ${stats.totalRevenue}
                </li> */}
            </ul>
        </div>
    );
};

export default AdminDashboard;
