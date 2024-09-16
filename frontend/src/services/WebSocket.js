// src/services/webSocketService.js
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const SOCKET_URL = 'http://localhost:8080/ws'; // URL của endpoint WebSocket mà bạn đã cấu hình trong Spring Boot
const CHAT_TOPIC = '/topic/messages'; // Đường dẫn của topic bạn đã cấu hình
const CHAT_ENDPOINT = '/app/chat/message'; // Đường dẫn của endpoint bạn đã cấu hình

let stompClient = null;

// Kết nối đến WebSocket
export const connectWebSocket = (onMessageReceived) => {
    const socket = new SockJS(SOCKET_URL);
    stompClient = Stomp.over(socket);
    
    stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe(CHAT_TOPIC, (message) => {
            if (message.body) {
                onMessageReceived(JSON.parse(message.body));
            }
        });
    });
};

// Gửi tin nhắn đến server
export const sendMessageWebSocket = (message) => {
    if (stompClient && stompClient.connected) {
        stompClient.send(CHAT_ENDPOINT, {}, JSON.stringify(message));
    } else {
        console.error('Stomp client not connected');
    }
};

// Ngắt kết nối WebSocket
export const disconnectWebSocket = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
};
