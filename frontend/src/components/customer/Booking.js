import React, { useState } from 'react';

const Booking = () => {
    const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newCustomer = {...customer}
        console.log(newCustomer);
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic đặt phòng ở đây
        console.log('Đặt phòng thành công!', customer);
    };

    return (
        <div>
            <h1>Đặt phòng</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Tên:
                    <input type="text" name="name" value={customer.name} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={customer.email} onChange={handleChange} />
                </label>
                <label>
                    Số điện thoại:
                    <input type="tel" name="phone" value={customer.phone} onChange={handleChange} />
                </label>
                <button type="submit">Xác nhận đặt phòng</button>
            </form>
        </div>
    );
};

export default Booking;
