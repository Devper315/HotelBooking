import React, { useContext, useState } from 'react'
import './../../assets/styles/customer/ChatButton.css';
import chatIcon from './../../assets/images/iconChat.png'
import { AuthContext } from '../../context/AuthContext';
import ChatWindow from './ChatWindow';

const ChatButton = () => {
    const {userInfo} = useContext(AuthContext)
    const [isChatOpen, setIsChatOpen] = useState(false)
    const toggleChat = () => {
        setIsChatOpen(true)
    }

    return (
        <div>
        {/* {userInfo.role === 'CUSTOMER' &&  */}
        {!isChatOpen && <div className='chat-button' onClick={toggleChat}
             title='Chat với chúng tôi'>
            <div className='tooltip'>Chat với chúng tôi</div>
            <img src={chatIcon} alt='Chat'/>
        </div>}
        {isChatOpen && <ChatWindow onClose={() => setIsChatOpen(false)}/>}
        </div>
    )
}

export default ChatButton
