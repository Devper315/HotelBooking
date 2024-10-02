// RegisterForm.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { registerCustomer } from '../../services/ProfileAPI';

const RegisterForm = () => {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const response = await registerCustomer(data);
        setShowSuccessModal(true);
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="w-100" style={{ maxWidth: '500px' }}>
                <h2 className="text-center mb-4">Đăng ký</h2>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-3">
                        <label className="form-label">Tên đầy đủ</label>
                        <input
                            type="text"
                            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                            {...register('fullName', { required: 'Tên đầy đủ là bắt buộc' })}
                        />
                        {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            {...register('email', {
                                required: 'Email là bắt buộc',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Email không hợp lệ'
                                }
                            })}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            {...register('password', {
                                required: 'Mật khẩu là bắt buộc',
                                minLength: {
                                    value: 3,
                                    message: 'Mật khẩu phải có ít nhất 3 ký tự'
                                }
                            })}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            {...register('confirmPassword', {
                                required: 'Xác nhận mật khẩu là bắt buộc',
                                validate: value => value === watch('password') || 'Mật khẩu không khớp'
                            })}
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                    </div>

                    {/* Field Ngày sinh */}
                    <div className="mb-3">
                        <label className="form-label">Ngày sinh</label>
                        <input
                            type="date"
                            className={`form-control ${errors.dateOfBirth ? 'is-invalid' : ''}`}
                            {...register('dateOfBirth', { required: 'Ngày sinh là bắt buộc' })}
                        />
                        {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth.message}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Đăng ký'}
                    </button>
                </form>
            </div>

            <Modal show={showSuccessModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Thành công</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Đăng ký thành công!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => navigate("/login")}>
                        Đăng nhập ngay
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RegisterForm;
