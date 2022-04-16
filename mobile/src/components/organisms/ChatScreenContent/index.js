import React, {useState, useCallback, useEffect} from 'react';
import {Icon} from 'react-native-elements';
import {
	GiftedChat,
	Bubble,
	MessageText,
	InputToolbar,
	Composer,
	Send,
	Message,
	Time
} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import { LogBox } from 'react-native';
import getStoredState from 'redux-persist/es/getStoredState';

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
				borderTopColor: '#000000',
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
				color={'#000000'}
				style={{width: 32, height: 32}}
			></Icon> : <Icon name='mic' color={'#000000'} style={{width: 32, height: 32}}></Icon>}
			
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
				borderColor: '#000000',
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
					backgroundColor: '#FFF8FA',
					borderTopLeftRadius: 8,
					borderTopRightRadius: 8,
				},
				right: {
					backgroundColor: '#FCDDEC',
					borderTopLeftRadius: 8,
					borderTopRightRadius: 8,
				},
			}}
			textStyle={{
				left: {
					color: '#000000'
				},
				right: {
					color: '#000000'
				}
			}}
		></MessageText>
	);
};

const time = (props) => {
	return (
		<Time
		{...props}
		timeTextStyle={{
			left: {
				color: '#AAAAAA'
			},
			right: {
				color: '#AAAAAA'
			}
		}}
		>
		</Time>
	)
}

const ChatBubble = (props) => {
	return (
		<Bubble
			{...props}
			wrapperStyle={{
				left: {
					backgroundColor: '#FFF8FA',
				},
				right: {
					backgroundColor: '#FCDDEC',
				},
			}}
			bottomContainerStyle={{
				left: {
					color: 'red',
					backgroundColor: '#FFF8FA',
					borderBottomLeftRadius: 8,
					borderBottomRightRadius: 8,
				},
				right: {
					backgroundColor: '#FCDDEC',
					borderBottomLeftRadius: 8,
					borderBottomRightRadius: 8,
				},
			}}
			usernameStyle={{
				color: '#AAAAAA'
			}}
		></Bubble>
	);
};

/**
 * Renders the content for the Chat Screen.
 *
 * @category Components
 * @exports ChatScreenContent
 * @subcategory Organisms
 */

const ChatScreenContent = (props) => {
	const {room} = props;

	const account = useSelector((state) => state.account);
	const socket = useSelector((state) => state.socket).socket;

	const [messages, setMessages] = useState([]);

	const receiveMessage = useCallback((messages = []) => {
		setMessages((previousMessages) => {
			return GiftedChat.append(previousMessages, messages[0])
		})
	}, [])

	useEffect(() => {
		socket.on('received-message', (receivedMessage) => {

		receiveMessage(receivedMessage)})

		return () => {
			setMessages([])
			socket.off('received-message')
		}
	}, [socket, room])

	const sendMessage = useCallback((messages = []) => {
		setMessages((previousMessages) => {
			return (GiftedChat.append(previousMessages, messages))
		})
		socket.emit('send-chat-message', messages, room)
	} , [room])
	

	return (
		<GiftedChat
			messages={messages}
			onSend={(messages) => sendMessage(messages)}
			showUserAvatar={true}
			alwaysShowSend
			renderUsernameOnMessage
			renderInputToolbar={ChatInputToolbar}
			renderComposer={ChatInputComposer}
			renderSend={ChatSendButton}
			renderMessageText={ChatMessageText}
			renderBubble={ChatBubble}
			renderTime={time}
			user={{
				_id: account.userName,
				name: account.userName,
				avatar: account.avatarImageURL === null ? account.avatarImage : account.avatarImageURL
			}}
		></GiftedChat>
	);
};

export default ChatScreenContent;
