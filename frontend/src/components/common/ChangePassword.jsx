import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { changePassword } from '../../services/ProfileAPI';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const errors = {};
        if (!currentPassword) errors.currentPassword = 'Mật khẩu hiện tại không được để trống';
        if (!newPassword) errors.newPassword = 'Mật khẩu mới không được để trống';
        if (newPassword !== confirmPassword) errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        if (newPassword.length < 3) errors.newPassword = 'Mật khẩu mới phải có ít nhất 3 ký tự';
        
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            const body = {
                currentPassword,
                newPassword
            }
            const response = await changePassword(body)
            if (response === 'Đổi mật khẩu thành công') setSuccessMessage(response);
            else setErrors({ form: 'Lỗi: mật khẩu cũ không chính xác' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Lỗi khi đổi mật khẩu:', error);
            setErrors({ form: 'Đã xảy ra lỗi khi đổi mật khẩu' });
        }
        setLoading(false);
    };

    return (
        <div className="change-password">
            <h2>Đổi Mật Khẩu</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCurrentPassword">
                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu hiện tại"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        isInvalid={!!errors.currentPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.currentPassword}
                    </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group controlId="formNewPassword">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        isInvalid={!!errors.newPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.newPassword}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Xác nhận mật khẩu mới"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                    </Form.Control.Feedback>
                </Form.Group>

                {errors.form && <p className="text-danger">{errors.form}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
                
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                </Button>
            </Form>
        </div>
    );
};

export default ChangePassword;
