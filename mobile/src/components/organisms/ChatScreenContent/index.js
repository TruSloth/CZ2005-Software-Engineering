import React, {useState, useCallback, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import {
	GiftedChat,
	Bubble,
	MessageText,
	InputToolbar,
	Composer,
	Send,
	Message
} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
LogBox.ignoreLogs(['Warning:']);

const ChatInputToolbar = (props) => {
	return (
		<InputToolbar
			{...props}
			containerStyle={{
				paddingVertical: 2,
				paddingHorizontal: 5,
				borderTopWidth: 1,
				borderTopColor: '#7879F1',
			}}
			primaryStyle={{alignItems: 'center'}}
		></InputToolbar>
	);
};

const ChatSendButton = (props) => {
	return (
		<Send
			{...props}
			disabled={!props.text}
			containerStyle={{
				width: 44,
				height: 44,
				alignItems: 'center',
				justifyContent: 'center',
				marginHorizontal: 4,
			}}
		>
			{props.text ? <Icon
				name='send'
				color={'#7879F1'}
				style={{width: 32, height: 32}}
			></Icon> : <Icon name='mic' color={'#7879F1'} style={{width: 32, height: 32}}></Icon>}
			
		</Send>
	);
};

const ChatInputComposer = (props) => {
	return (
		<Composer
			{...props}
			textInputStyle={{
				borderWidth: 1,
				borderRadius: 20,
				borderColor: '#7879F1',
				marginLeft: 0,
			}}
		></Composer>
	);
};

const ChatMessage = (props) => {
	return (<Message
    {...props}
    containerStyle={{
      left: { backgroundColor: 'lime', marginTop: 5 },
      right: { backgroundColor: 'gold', marginTop: 5 },
    }}
  />)
}

const ChatMessageText = (props) => {
	return (
		<MessageText
			{...props}
			containerStyle={{
				left: {
					backgroundColor: '#A5A6F6',
					borderTopLeftRadius: 8,
					borderTopRightRadius: 8,
				},
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
				left: {
					backgroundColor: '#A5A6F6',
				},
				right: {
					backgroundColor: '#7879F1',
				},
			}}
			bottomContainerStyle={{
				left: {
					backgroundColor: '#A5A6F6',
					borderBottomLeftRadius: 8,
					borderBottomRightRadius: 8,
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

	const account = useSelector((state) => state.account);
	const socket = useSelector((state) => state.socket).socket;

	const [messages, setMessages] = useState([]);

	const receiveMessage = useCallback((messages = []) => {
		setMessages((previousMessages) => {
			return GiftedChat.append(previousMessages, messages[0])
		})
	}, [])

	useEffect(() => {
		socket.on('received-message', (receivedMessage) => receiveMessage(receivedMessage))

		return () => {
			socket.off('receiving-message')
		}
	}, [socket])

	const sendMessage = useCallback((messages = []) => {
		setMessages((previousMessages) => {
			return (GiftedChat.append(previousMessages, messages))
		})
		socket.emit('send-chat-message', messages, 'Location 1')
	} , [])
	

	return (
		<GiftedChat
			messages={messages}
			onSend={(messages) => sendMessage(messages)}
			showUserAvatar={true}
			alwaysShowSend
			renderInputToolbar={ChatInputToolbar}
			renderComposer={ChatInputComposer}
			renderSend={ChatSendButton}
			renderMessageText={ChatMessageText}
			renderBubble={ChatBubble}
			user={{
				_id: account.userName,
				name: account.userName,
				avatar: reactNativeLogo
			}}
		></GiftedChat>
	);
};

export default ChatScreenContent;
