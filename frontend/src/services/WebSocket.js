import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const CHAT_ENDPOINT = '/app/private/send'; // Đường dẫn của endpoint bạn đã cấu hình

let stompClient
let headers;

// Kết nối đến WebSocket
const SOCKET_URL = 'http://localhost:8080/ws';

export const connectWebSocket = (handleMessageReceived, userEmail) => {
    const chatTopic = `/user/${userEmail}/private/reply`;
    const socket = new SockJS(SOCKET_URL);
    const token = localStorage.getItem("token")
    headers = {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true'
    }
    stompClient = Stomp.over(socket);
    stompClient.connect(headers, (frame) => {
        stompClient.subscribe(chatTopic, (message) => {
            if (message.body) {
                handleMessageReceived(JSON.parse(message.body));
            }
        });
    });
};

// Gửi tin nhắn đến server
export const sendMessageWebSocket = (message) => {
    stompClient.send(CHAT_ENDPOINT, {}, JSON.stringify(message));

};

// Ngắt kết nối WebSocket
export const disconnectWebSocket = () => {
    if (stompClient)
        stompClient.disconnect();
};
