import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";

import ChatScreenContent from "../../components/organisms/ChatScreenContent";
import { useSelector } from "react-redux";

const ChatScreen = (props) => {
    const socket = useSelector((state) => state.socket).socket

    console.log(socket.connected)

    useFocusEffect(
        useCallback(() => {
            if (!socket.connected) {
                socket.connect()
            }

            socket.emit('join-room', 'Location 1')

            const leaveRoom = (room) => {
                socket.emit('leave-room', room)
            }

            return () => leaveRoom('Location 1');
        })
    )

    return (
        <ChatScreenContent></ChatScreenContent>
    )
}

export default ChatScreen;