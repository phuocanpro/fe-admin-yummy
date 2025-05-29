// src/pages/ChatPage.jsx
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import RestaurantAPI from "../../API/RestaurantAPI";
import UserAPI from "../../API/UserAPI";
import firebase from '@firebase/app'
import "firebase/firestore";
import "firebase/auth";

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [chatList, setChatList] = useState([]);
    const [userInfos, setUserInfos] = useState({});

    var db = firebase.firestore();

    const [infoData, setInfoData] = useState({
        id: "",
        name: "",
        phone: "",
        address: "",
        opening_hours: "",
        method: "",
    });

    const idUser = localStorage.getItem("userId");

    // Lấy thông tin nhà hàng (res_id)
    useEffect(() => {
        const fetchRestaurantInfo = async () => {
            try {
                const data = await RestaurantAPI.Get_Item_Owner(idUser);
                setInfoData(data);
            } catch (error) {
                console.log("Lỗi khi lấy thông tin nhà hàng:", error);
            }
        };

        if (idUser) fetchRestaurantInfo();
    }, [idUser]);

    // Lấy danh sách chat theo res_id
    useEffect(() => {
        if (!infoData.id) return;

        const unsubscribe = db
            .collection("chats")
            .where("res_id", "==", Number(infoData.id))
            .onSnapshot(async (snapshot) => {
                const chatDocs = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setChatList(chatDocs);

                // Set mặc định cuộc chat đầu tiên (nếu chưa có selectedChat hoặc selectedChat không còn trong list)
                setSelectedChat((prevSelected) => {
                    if (!prevSelected || !chatDocs.find(chat => chat.id === prevSelected.id)) {
                        return chatDocs[0] || null;
                    }
                    return prevSelected;
                });

                // Trích user_id từ chats
                const uniqueUserIds = [...new Set(chatDocs.map(chat => chat.user_id))];

                // Gọi API lấy thông tin từng user
                const userInfoMap = {};
                for (let userId of uniqueUserIds) {
                    try {
                        const res = await UserAPI.Get_User(userId);

                        userInfoMap[userId] = {
                            id: res.id,
                            name: res.name,
                            email: res.email,
                            phone: res.phone,
                        };
                    } catch (err) {
                        console.error(`Lỗi khi lấy thông tin user_id=${userId}`, err);
                    }
                }

                setUserInfos(userInfoMap);
            });

        return () => unsubscribe();
    }, [infoData.id]);


    return (
        <Row style={{ height: '100vh' }}>
            <Col span={6} style={{
                height: '100vh',
                overflowY: 'auto',
                borderRight: '1px solid #ddd',
                position: 'sticky',
                top: 0,
            }}>
                <ChatSidebar
                    chatList={chatList}
                    userInfos={userInfos}
                    onSelectChat={setSelectedChat}
                    selectedChat={selectedChat}
                />
            </Col>
            <Col span={18} style={{
                height: '100vh',
                overflowY: 'hidden', // ẩn scroll ngoài chat window
            }}>
                <ChatWindow chat={selectedChat} userInfos={userInfos} />
            </Col>
        </Row>
    );
};

export default ChatPage;
