import React, {useState, useCallback} from 'react';
import {View} from 'react-native';
import {GiftedChat, Bubble, MessageText, Message} from 'react-native-gifted-chat';

const ChatMessage = (props) => {
    return (
        <Message
            {...props}
        ></Message>
    )
}

const ChatMessageText = (props) => {
	return (
		<MessageText
			{...props}
			containerStyle={{
				left: {backgroundColor: '#A5A6F6'},
				right: {
					backgroundColor: '#7879F1',
					borderTopLeftRadius: 8,
					borderTopRightRadius: 8,
				},
			}}
		></MessageText>
	);
};

const ChatBubble = (props) => {
	return (
		<Bubble
			{...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#7879F1'
                }
            }}
			bottomContainerStyle={{
				left: {
					backgroundColor: '#A5A6F6',
				},
				right: {
					backgroundColor: '#7879F1',
                    borderBottomLeftRadius: 8,
					borderBottomRightRadius: 8,
				},
			}}
		></Bubble>
	);
};

const ChatScreenContent = () => {
	const reactNativeLogo = 'https://reactjs.org/logo-og.png';

	const [messages, setMessages] = useState([]);

	const sendMessage = useCallback((messages = []) => {
		messages[0].user = {
			name: 'John',
			avatar: reactNativeLogo,
		};
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);

	return (
		<GiftedChat
			messages={messages}
			onSend={(messages) => sendMessage(messages)}
			showUserAvatar={true}
            renderMessage={ChatMessage}
			renderMessageText={ChatMessageText}
			renderBubble={ChatBubble}
		></GiftedChat>
	);
};

export default ChatScreenContent;
