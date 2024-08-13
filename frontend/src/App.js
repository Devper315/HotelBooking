
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/customer/Home';
import RoomDetail from './components/customer/RoomDetail';
import Booking from './components/customer/Booking';
import AdminDashboard from './components/admin/AdminDashboard';
import ManageRoom from './components/admin/ManageRoom/ManageRoom';
import ManageBooking from './components/admin/ManageBooking';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RegisterForm from './pages/RegisterForm';
import LoginForm from './pages/LoginForm';
import { AuthProvider } from './context/AuthContext';
import RoomList from './components/customer/RoomList';
import UploadForm from './components/admin/UploadForm';
import ImageDisplay from './components/customer/ImageDisplay';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>

        <Route path='/home' element={<Home />} />
        <Route path='/room/:id' element={<RoomDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Routes dành cho quản trị viên */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/manage-room" element={<ManageRoom />} />
        <Route path="/admin/manage-booking" element={<ManageBooking />} />
        <Route path="/admin/upload-form" element={<UploadForm />} />
        <Route path="/admin/image-display" element={<ImageDisplay />} />
        {/* Trang dành cho khách */}
        <Route path="/user/see-rooms" element={<RoomList />} />
        
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
