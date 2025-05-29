import React, { useState, useRef, useEffect } from 'react';
import { Typography, List, Input, Button } from 'antd';
import firebase from '@firebase/app'
import "firebase/firestore";
import "firebase/auth";

const { Title, Text } = Typography;

const ChatWindow = ({ chat, userInfos }) => {
    const [inputMessage, setInputMessage] = useState('');
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);
    var db = firebase.firestore();

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chat?.messages]);

    if (!chat) {
        return <Title level={4}>Chọn một cuộc trò chuyện</Title>;
    }

    const user = userInfos?.[chat.user_id];

    const handleSendMessage = async () => {
        const trimmedMessage = inputMessage.trim();
        if (!trimmedMessage) return;

        setSending(true);

        const newMessage = {
            message: trimmedMessage,
            sender: 'restaurant',
            timestamp: new Date().toLocaleString('vi-VN', { hour12: false }),
        };

        try {
            await db.collection('chats').doc(chat.id).update({
                messages: firebase.firestore.FieldValue.arrayUnion(newMessage),
                lastest_timestamp: newMessage.timestamp,
            });

            setInputMessage('');
        } catch (error) {
            console.error('Lỗi gửi tin nhắn:', error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div
            style={{
                height: 'calc(100vh - 64px)', // thay 64px bằng chiều cao header nếu có
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div
                style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: 12,
                }}
            >
                <Title level={4}>
                    Đang trò chuyện với {user?.name || `Người dùng #${chat.user_id}`}
                </Title>

                <List
                    dataSource={chat.messages}
                    renderItem={(msg, idx) => {
                        const isRestaurant = msg.sender === 'restaurant';
                        const senderName = isRestaurant ? 'Bạn' : user?.name || `Người dùng #${chat.user_id}`;

                        return (
                            <List.Item
                                key={idx}
                                style={{
                                    justifyContent: isRestaurant ? 'flex-end' : 'flex-start',
                                    padding: '6px 12px',
                                    backgroundColor: isRestaurant ? '#e6f7ff' : '#f5f5f5',
                                    margin: '8px 0',
                                    borderRadius: 6,
                                    maxWidth: '70%',
                                    marginLeft: isRestaurant ? 'auto' : 0,
                                    marginRight: isRestaurant ? 0 : 'auto',
                                    flexDirection: 'column',
                                    alignItems: isRestaurant ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <Text strong style={{ marginBottom: 4 }}>
                                    {senderName}
                                </Text>
                                <Text style={{ fontSize: 16 }}>{msg.message}</Text>
                                <Text type="secondary" style={{ fontSize: 12 }}>
                                    {msg.timestamp}
                                </Text>
                            </List.Item>
                        );
                    }}
                />
                {/* Dummy div để scroll tới cuối */}
                <div ref={messagesEndRef} />
            </div>

            <div
                style={{
                    padding: '8px 12px',
                    borderTop: '1px solid #ddd',
                    backgroundColor: '#fff',
                    display: 'flex',
                    gap: 8,
                }}
            >
                <Input.TextArea
                    rows={2}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onPressEnter={(e) => {
                        if (!e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    placeholder="Nhập tin nhắn..."
                    disabled={sending}
                    style={{ flex: 1 }}
                />
                <Button
                    type="primary"
                    onClick={handleSendMessage}
                    loading={sending}
                >
                    Gửi
                </Button>
            </div>
        </div>
    );
};

export default ChatWindow;
