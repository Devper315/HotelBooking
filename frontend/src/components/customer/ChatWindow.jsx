import React, { useContext, useEffect, useRef, useState } from 'react';
import './../../assets/styles/customer/ChatWindow.css';
import iconSend from './../../assets/images/iconSend.png'
import { AuthContext } from '../../context/AuthContext';
import { MessageStatusTranslation } from '../../translations/MessageStatusTranslation';
import { connectWebSocket, disconnectWebSocket, sendMessageWebSocket } from '../../services/WebSocket';


const mockMessages = [
    { userId: 1, content: 'Hi, how are you?', time: '10:00 AM' }, // userA
    { userId: 1, content: 'I am good, thanks! How about you?', time: '10:01 AM' }, // userB
    { userId: 1, content: 'I am doing well, just working on a project.', time: '10:02 AM' }, // userA
    { userId: 2, content: 'That’s great! What kind of project?', time: '10:03 AM' }, // userB
    { userId: 1, content: 'It’s a chat application.', time: '10:04 AM' }, // userA
    { userId: 2, content: 'Sounds interesting!', time: '10:05 AM' }, // userB
    { userId: 1, content: 'Yes, it is! What are you up to?', time: '10:06 31/05/2002' }, // userA
    { userId: 2, content: 'Just relaxing. Let me know if you need any help.', time: '10:07 AM' }, // userB
    { userId: 1, content: 'Thanks! I’ll keep that in mind.', time: '10:08 AM' }, // userA
    { userId: 2, content: 'No problem. Have a great day!', time: '10:06 31/05/2002' }  // userB
];


const ChatWindow = ({ onClose }) => {
    const { userInfo } = useContext(AuthContext)
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState(mockMessages)
    const chatBodyRef  = useRef(null)

    useEffect(() => {
        connectWebSocket((newMessage) => {
            setMessageList((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            disconnectWebSocket();
        };
    }, []);

    useEffect(() => {
        const chatBody = chatBodyRef.current
        if (chatBody){
            chatBody.scrollTop = chatBody.scrollHeight
        }
    }, [messageList])

    useEffect(() => {
        const chatBody = chatBodyRef.current
        if (chatBody){
            chatBody.scrollTop = chatBody.scrollHeight
        }
    }, [])


    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // Gửi tin nhắn khi nhấn Enter, không nhấn Shift
            e.preventDefault(); // Ngăn không cho xuống dòng
            handleSend();
        }
    };
    const handleSend = () => {
        if (message) {
            const newMessage = {
                userId: 2,
                content: message,
                status: 'sending'
            }
            sendMessageWebSocket(newMessage)
            setMessageList([...messageList, newMessage])
            setMessage('')
        }
    }


    return (
        <div className="chat-window">
            <div className="chat-header">
                <h>Chat với chúng tôi</h>
                <button className="close-button" onClick={onClose}>×</button>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
                {messageList.map((msg, index) => (
                    <div className={`message ${msg.userId === 2 ? 'sent' : 'received'}`} key={index}>
                        <div className="message-content">
                            {msg.content}
                        </div>
                        <div className="message-time">
                            {msg.time ? msg.time : MessageStatusTranslation[msg.status]}
                        </div>
                    </div>
                ))}
            </div>
            <div className='chat-footer'>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Aa"
                    className="chat-input" 
                    rows="1"
                    onKeyDown={handleKeyDown}/>
                <button
                    className="send-button"
                    onClick={handleSend}>
                    <img src={iconSend} alt="Gửi" className="send-icon" />
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
