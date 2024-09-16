import { createConfig } from '../helper/jwtHelper.js';
import {API_BASE_URL} from './RoomAPI.js'
import axios from 'axios';


export const createBooking = async (bodyData) => {
    try {
        const config = createConfig()
        const response = await axios.post(`${API_BASE_URL}/customer/booking`, 
            bodyData, 
            config
        );
        return response.data.result;
    } catch (error) {
        console.error('Lỗi đặt phòng:', error);
    }
};

export const fetchMyBooking = async () => {
    try {
        const config = createConfig()
        const response = await axios.get(`${API_BASE_URL}/customer/booking`, config);
        let bookingData = response.data.result;
        let bookingList = bookingData.map(booking => ({
            id: booking.id,
            bookingDate: booking.bookingDate,
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
            customerName: booking.customerName,
            roomNumber: booking.room.roomNumber,
            status: booking.status

        }))
        return bookingList
    } catch (error) {
        console.error('Lỗi lấy dữ liệu đặt phòng cá nhân:', error);
    }
}

export const fetchBookingById = async (id) => {
    try {
        const config = createConfig()
        const response = await axios.get(`${API_BASE_URL}/customer/booking/${id}`, config);
        let booking = response.data.result;
        return {
            ...booking,
            roomNumber: booking.room.roomNumber
        }
    } catch (error) {
        console.error('Lỗi lấy dữ liệu đặt phòng theo ID:', error);
    }
}

export const fetchAllBooking = async () => {
    try {
        const config = createConfig()
        const response = await axios.get(`${API_BASE_URL}/admin/booking/all`, config);
        let bookingData = response.data.result;
        let bookingList = bookingData.map(booking => ({
            id: booking.id,
            bookingDate: booking.bookingDate,
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate,
            customerName: booking.customerName,
            roomNumber: booking.room.roomNumber,
            status: booking.status

        }))
        return bookingList
    } catch (error) {
        console.error('Lỗi lấy dữ liệu đặt phòng:', error);
    }
}

export const manageStateBooking = async (id, action) => {
    try {
        const config = createConfig()
        config.params = {id}
        const response = await axios.patch(`${API_BASE_URL}/admin/booking/${action}`, 
            {},
            config
        );
        return response.data.result;
    } catch (error) {
        console.error('Lỗi thao tác đơn đặt phòng:', error.response.data.message);
    }
};

export const cancelBooking = async (id) => {
    try {
        const config = createConfig()
        config.params = {id}
        const response = await axios.patch(`${API_BASE_URL}/customer/booking/cancel`, 
            {},
            config
        );
        return response.data.result;
    } catch (error) {
        console.error('Lỗi hủy đơn đặt phòng:', error);
    }
};



