import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";

import ChatScreenContent from "../../components/organisms/ChatScreenContent";
import { useSelector } from "react-redux";

const ChatScreen = (props) => {
    const {route} = props

    const room = route.params === undefined ? 'General' : route.params.venueID;

    const socket = useSelector((state) => state.socket).socket

    useFocusEffect(
        useCallback(() => {
                socket.emit('join-room', room)

                const leaveRoom = (room) => {
                    socket.emit('leave-room', room)
                }

                return () => leaveRoom(room);
        })
    )

    return (
        <ChatScreenContent room={room}></ChatScreenContent>
    )
}

export default ChatScreen;