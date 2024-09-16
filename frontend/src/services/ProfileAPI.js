import {API_BASE_URL} from './hotel/RoomAPI.js'
import axios from 'axios'
import { createConfig } from './helper/jwtHelper.js'
import { da } from 'date-fns/locale'


export const registerCustomer = async (body) => {
    try{
        const response = await axios.post(`${API_BASE_URL}/register`, body)
        return response.data.result
        
    } catch(error){
        console.log("Lỗi đăng ký: " + error.response);
    }
}

export const fetchProfile = async () => {
    try{
        const config = createConfig()
        const response = await axios.get(`${API_BASE_URL}/profile/my-info`,
            config
        )
        return response.data.result
        
    } catch(error){
        console.log("Lỗi lấy thông tin cá nhân: " + error);
    }
}

export const updateProfile = async (user) => {
    const body = {
        fullName: user.fullName,
        dateOfBirth: user.dateOfBirth,
    }
    try{
        const config = createConfig()
        const response = await axios.put(`${API_BASE_URL}/profile`,
            body,
            config
        )
        return response.data.result
    } catch(error){
        console.log("Lỗi sửa thông tin cá nhân: " + error);
        throw(error)
    }
}

export const changePassword = async (body) => {
    try{
        const config = createConfig()
        const response = await axios.post(`${API_BASE_URL}/profile/change-password`,
            body,
            config)
        return response.data.result
    } catch(error){
        console.log("Lỗi đổi mật khẩu: " + error);
        throw(error)
    }
}

export const fetchAllCustomer = async () => {
    try{
        const config = createConfig()
        const response = await axios.get(`${API_BASE_URL}/admin/user/customer`, config)
        const data = response.data.result
        const customerData = data.map(customer => ({
            id: customer.id,
            fullName: customer.fullName,
            email: customer.email
        }))
        return customerData
    } catch(error){
        console.log("Lỗi lấy thông tin khách hàng " + error);
        throw(error)
    }
}