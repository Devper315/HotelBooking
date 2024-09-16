import React, { useEffect, useState } from 'react';
import './../../assets/styles/common/UserProfile.css'; // Import file CSS cho component
import { fetchProfile, updateProfile } from '../../services/ProfileAPI';
import { fetchImageURL, uploadImage } from '../../services/RoomAPI';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [editUser, setEditUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const userMap = {
        USER: "Khách hàng",
        ADMIN: "Quản lý"
    };
    // Lấy thông tin cá nhân
    useEffect(() => {
        const getUserInfo = async () => {
            const profile = await fetchProfile();
            setUser({
                ...profile,
                role: userMap[profile.roles[0].name],
            });
        }

        getUserInfo();
    }, []);
    
    // Lấy ảnh
    useEffect(() => {
        const getImageUrl = async () => {
            try {
                const avatarUrl = await fetchImageURL(user.avatarPath);
                setImageUrl(avatarUrl)
            } catch (error) {
                console.error('Lỗi khi lấy url ảnh:', error);
            }
        };
        if (user.avatarPath) getImageUrl()
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser({
            ...editUser,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setEditUser({
                ...editUser,
                imageFile: file
            });
        }
    };

    const handleEdit = () => {
        setEditUser(user);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditUser({});
        setIsEditing(false);
        setPreviewImage(null);
    };

    const handleSave = async () => {
        setIsLoading(true);
        let avatarPath;
        if (editUser.imageFile instanceof File) {
            avatarPath = await uploadImage(editUser, "profile");
        }
        const updatedUser = { ...editUser, avatarPath };
        await updateProfile(updatedUser);
        console.log(updatedUser);
        setUser(updatedUser);
        setEditUser({});
        setIsEditing(false);
        setIsLoading(false);
        setSuccessMessage('Cập nhật thành công!');
        setPreviewImage(null);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const displayUser = isEditing ? editUser : user;

    return (
        <div className="user-profile">
            <div className="profile-header">
                <img
                    src={previewImage || imageUrl}
                    alt="User Avatar"
                    className="profile-avatar"
                />
                {isEditing && <div className="profile-avatar-input-container">
                    <input
                        type="file"
                        id="avatar-input"
                        onChange={handleFileChange}
                        style={{ display: 'none' }} // Ẩn input mặc định
                    />
                    <label htmlFor="avatar-input" className="custom-file-upload">
                        Đổi ảnh đại diện
                    </label>
                </div>}

            </div>
            <div className="profile-details">
                {isEditing ? (
                    <input
                        type="text"
                        name="fullName"
                        value={displayUser.fullName || ''}
                        onChange={handleInputChange}
                        className="profile-name-input"/>
                ) : (
                    <h1 className="profile-name">{displayUser.fullName}</h1>
                )}
                <p><strong>Email: </strong>{displayUser.email}</p>
                <p><strong>Ngày sinh: </strong>
                    {isEditing ? (
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={displayUser.dateOfBirth || ''}
                            onChange={handleInputChange}
                            className="profile-dob-input"/>
                    ) : (
                        displayUser.dateOfBirth)}
                </p>
                <p><strong>Vai trò: </strong>{displayUser.role}</p>
            </div>
            <div className="profile-actions">
                {isEditing ? (
                    <>
                        <button onClick={handleSave} disabled={false}>
                            {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                        </button>
                        <button onClick={handleCancel}>Hủy</button>
                    </>
                ) : (
                    <button onClick={handleEdit}>Chỉnh sửa</button>
                )}
            </div>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default UserProfile;
