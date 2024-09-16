import React, { useState, useEffect } from 'react'
import { fetchRooms, uploadImage, updateRoom, createRoom, deleteRoom } from '../../../services/hotel/RoomAPI'
import RoomCard from './RoomCard'
import AddRoomModal from './AddRoomModal'
import DeleteConfirmationModal from './DeleteConfirmationModal'

const ManageRoom = () => {
    const [rooms, setRooms] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingRoomId, setEditingRoom] = useState(null)
    const [editedRoom, setEditedRoom] = useState({})
    const [isAdding, setIsAdding] = useState(false)
    const [newRoom, setNewRoom] = useState({
        roomNumber: '',
        type: 'Standard',
        price: '',
        status: 'Available',
        imagePath: ''
    })
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [roomToDelete, setRoomToDelete] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    useEffect(() => {
        const getRooms = async () => {
            const rooms = await fetchRooms()
            setRooms(rooms)
            setIsLoading(false)
        }

        getRooms()
    }, [])

    // Xử lý khi bấm sửa 1 phòng
    const handleEditClick = (room) => {
        setEditingRoom(room.id)
        setEditedRoom({ ...room })
    }

    // Xử lý sửa từng field
    const handleFieldChange = (e) => {
        const { name, value } = e.target
        if (isAdding)
            setNewRoom({
                ...newRoom,
                [name]: value,
            })
        else
            setEditedRoom({
                ...editedRoom,
                [name]: value,
            })
    }


    const handleFinishEdit = async (type) => {
        if (type === 'save') {
            setIsLoading(true)
            const newImagePath = editedRoom.imageFile ? await uploadImage(editedRoom, 'room') : editedRoom.imagePath

            await updateRoom(editedRoom)
            setRooms(rooms.map(room => (room.id === editedRoom.id ? { ...editedRoom, imagePath: newImagePath } : room)))
        }
        setEditingRoom(null)
        setEditedRoom(null)
        setPreviewImage(null)
        setIsLoading(false)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (isAdding) {
                    console.log('running here')
                    setNewRoom((prevNewRoom) => ({
                        ...prevNewRoom,
                        imageFile: file
                    }))
                    setPreviewImage(reader.result)
                }
                else {
                    setEditedRoom((prevEditedRoom) => ({
                        ...prevEditedRoom,
                        imageFile: file
                    }))
                    setPreviewImage(reader.result)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const handleAddClick = () => {
        setIsAdding(true)
    }

    const handleAddSaveClick = async () => {
        let roomCreated = await createRoom(newRoom)
        if (newRoom.imageFile) {
            roomCreated.imageFile = newRoom.imageFile
            const imagePath = await uploadImage(roomCreated, 'room')
            roomCreated.imagePath = imagePath
        }
        setRooms([...rooms, roomCreated])
        setIsAdding(false)
        setNewRoom({
            roomNumber: '',
            type: 'Standard',
            price: '',
            status: 'Available',
            imageUrl: '', // Đặt lại trạng thái imageUrl
        })
        setPreviewImage(null) // Đặt lại ảnh xem trước
    }

    const handleDeleteClick = (room) => {
        setRoomToDelete(room)
        setShowDeleteModal(true)
    }

    const handleConfirmDelete = async () => {
        await deleteRoom(roomToDelete)
        setRooms(rooms.filter(room => room.id !== roomToDelete.id))
        setShowDeleteModal(false)
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Quản lý phòng khách sạn</h1>
            <button className="btn btn-primary mb-4" onClick={handleAddClick}>Thêm phòng mới</button>
            {isLoading && <div className="loading-spinner">Đang xử lý</div>}
            <div className="row">
                {rooms.map(room => (
                    <div key={room.id} className="col-md-4 mb-4">
                        <RoomCard
                            room={room}
                            editedRoom={editedRoom}
                            isEditing={editingRoomId === room.id}
                            onFieldChange={handleFieldChange}
                            onEditClick={handleEditClick}
                            onDeleteClick={handleDeleteClick}
                            onImageChange={handleImageChange}
                            previewImage={previewImage}
                            onFinishEdit={handleFinishEdit}
                        />
                    </div>
                ))}
            </div>
            {/* Modal thêm phòng mới */}
            <AddRoomModal
                show={isAdding}
                onHide={() => setIsAdding(false)}
                room={newRoom}
                onFieldChange={handleFieldChange}
                onImageChange={handleImageChange}
                onSaveClick={handleAddSaveClick}
                previewImage={previewImage} />
            {/* Modal xác nhận xóa */}
            <DeleteConfirmationModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                onConfirmDelete={handleConfirmDelete} />
        </div>
    )
}

export default ManageRoom
