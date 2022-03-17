import React, {useState, useCallback} from 'react';
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
				backgroundColor: 'red',
				marginLeft: 0,
			}}
		></Composer>
	);
};

const ChatMessage = (props) => {
	return (<Message
    {...props}
    // renderDay={() => <Text>Date</Text>}
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

	const [messages, setMessages] = useState([
		{
			_id: 'John',
			text: 'Hello there',
			user: {
				_id: 'Adam',
				name: 'Adam',
				avatar: reactNativeLogo,
			},
		},
	]);

	const sendMessage = useCallback((messages = []) => {
		messages[0].user = {
			_id: 'John',
			name: 'John',
			avatar: reactNativeLogo,
		};

		messages[0].position = 'right';
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);

	return (
		<GiftedChat
			messages={messages}
			onSend={(messages) => sendMessage(messages)}
			showUserAvatar={true}
			alwaysShowSend
			renderInputToolbar={ChatInputToolbar}
			renderMessage={ChatMessage}
			renderComposer={ChatInputComposer}
			renderSend={ChatSendButton}
			renderMessageText={ChatMessageText}
			renderBubble={ChatBubble}
			user={{
				_id: 'John',
				name: account.userName,
			}}
		></GiftedChat>
	);
};

export default ChatScreenContent;
