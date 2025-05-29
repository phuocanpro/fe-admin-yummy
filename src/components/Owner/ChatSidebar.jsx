// src/components/ChatSidebar.jsx
import React from 'react';
import { List } from 'antd';

const ChatSidebar = ({ chatList, onSelectChat, selectedChat, userInfos }) => {
    console.log(userInfos);
    return (
        <List
            itemLayout="horizontal"
            dataSource={chatList}
            renderItem={(chat) => {
                const user = userInfos[chat.user_id] || {};
                const lastMessage = chat.messages?.[chat.messages.length - 1]?.message ?? '';

                return (
                    <List.Item
                        onClick={() => onSelectChat(chat)}
                        style={{
                            backgroundColor: selectedChat?.id === chat.id ? '#f0f0f0' : '#fff',
                            cursor: 'pointer',
                            padding: '12px 16px'
                        }}
                    >
                        <List.Item.Meta
                            title={user.name ? `${user.name} (ID: ${chat.user_id})` : `Người dùng #${chat.user_id}`}
                            description={lastMessage}
                        />
                    </List.Item>
                );
            }}
        />
    );
};

export default ChatSidebar;
