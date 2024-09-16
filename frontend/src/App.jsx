
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/customer/Home';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageRoom from './components/admin/ManageRoom/ManageRoom';
import ManageBooking from './components/admin/ManageBooking';
import Header from './components/common/Header';
import RegisterForm from './components/common/RegisterForm';
import LoginForm from './components/common/LoginForm';
import Footer from './components/common/Footer';
import RoomList from './components/customer/RoomList';
import UserProfile from './components/common/UserProfile';
import ChangePassword from './components/common/ChangePassword';
import MyBooking from './components/customer/ManageBooking/MyBooking';
import BookingDetail from './components/customer/ManageBooking/BookingDetail';
import ManageHotel from './components/admin/ManageHotel/ManageHotel';
import ChatButton from './components/customer/ChatButton';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<RoomList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile/my-info" element={<UserProfile />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />
        {/* Routes dành cho quản trị viên */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-room" element={<ManageRoom />} />
        <Route path="/admin/manage-hotel" element={<ManageHotel />} />
        <Route path="/admin/manage-booking" element={<ManageBooking />} />
        {/* Trang dành cho khách */}
        <Route path="/customer/see-rooms" element={<RoomList />} />
        <Route path="/customer/my-bookings" element={<MyBooking />} />
        <Route path="/customer/booking-detail" element={<BookingDetail />} />
      </Routes>
      <ChatButton />
      <Footer />
    </div>
  );
}

export default App;
