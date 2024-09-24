import React, { useContext, useEffect, useRef, useState } from 'react';
import './../../assets/styles/customer/ChatWindow.css';
import iconSend from './../../assets/images/iconSend.png'
import { AuthContext } from '../../context/AuthContext';
import { MessageStatusTranslation } from '../../translations/MessageStatusTranslation';
import { connectWebSocket, disconnectWebSocket, sendMessageWebSocket } from '../../services/WebSocket';
import { fetchMessageByConversationId } from '../../services/chat/MessageAPI';
import { fetchMyConversation } from '../../services/chat/ConversationAPI';
import { format } from 'date-fns';


const ChatWindow = ({ onClose, recipient }) => {
    const { userInfo } = useContext(AuthContext)
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const chatBodyRef = useRef(null)
    const [openingConversation, setOpeningConversation] = useState(null);

    useEffect(() => {
        const getMessage = async () => {
            const conversation = await fetchMyConversation(recipient.id)
            const messageData = await fetchMessageByConversationId(conversation.id);
            setOpeningConversation(conversation);
            console.log(conversation);
            setMessageList(messageData);
        };
    
        getMessage()
    }, [recipient.id]);

    useEffect(() => {
        const connectAndDisconnectWebSocket = () => {
            connectWebSocket((newMessage) => {
                setMessageList((prevMessages) => [...prevMessages, newMessage]);
            }, userInfo.email);
    
            return () => {
                disconnectWebSocket();
            };
        };
        const cleanup = connectAndDisconnectWebSocket();
        return cleanup;
    }, [userInfo.email]);

    useEffect(() => {
        const chatBody = chatBodyRef.current
        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight
        }
    }, [messageList])

    useEffect(() => {
        const chatBody = chatBodyRef.current
        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight
        }
    }, [])


    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };
    const handleSend = () => {
        if (message) {
            const newMessage = {
                conversationId: openingConversation.id,
                sender: openingConversation.sender,
                recipient: openingConversation.recipient,
                content: message,
                status: 'sending',
                time: format(new Date(), 'HH:mm dd/MM/yyyy')
            }
            sendMessageWebSocket(newMessage)
            setMessageList([...messageList, newMessage])
            setMessage('')
        }
    }


    return (
        <div className="chat-window">
            <div className="chat-header">
                <h>{userInfo.role === "ADMIN" ? recipient.fullName : "Chat với chúng tôi"}</h>
                <button className="close-button" onClick={onClose}>×</button>
            </div>
            <div className="chat-body" ref={chatBodyRef}>
                {messageList.map((msg, index) => (
                    <div className={`message ${msg.sender === userInfo.email ? 'sent' : 'received'}`} key={index}>
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
                    onKeyDown={handleKeyDown} />
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
