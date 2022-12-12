import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from 'axios'
import { REST_API_LOCAL } from "@env";

// const REST_API_LOCAL = "http://192.168.0.117:4000";

import ChatHeader from "../components/messages/ChatHeader";
import ChatInput from "../components/messages/ChatInput";
import MessagesList from "../components/messages/MessagesList";

const MessagesScreen = ({ navigation, route }) => {
	const [msg, setMsg] = useState();
	const [chatMessages, setChatMessages] = useState([]);

	const [chatId, setChatId] = useState();
	const [personId, setPersonId] = useState();

	const [reply, setReply] = useState("");
	const [isLeft, setIsLeft] = useState();

	const swipeToReply = (msg, isLeft) => {
		setReply(msg.length > 50 ? msg.slice(0, 50) + '...' : msg);
		setIsLeft(isLeft);
	};

	const closeReply = () => {
		setReply("");
	};

	return (
		<View style={{ flex: 1 }}>

			<ChatHeader />
			<MessagesList onSwipeToReply={swipeToReply}
				navigation={navigation}
				msg={msg} setMsg={setMsg}
				chatId={chatId} personId={personId}
				chatMessages={chatMessages} setChatMessages={setChatMessages}
				setChatId={setChatId} setPersonId={setPersonId} />

			<ChatInput reply={reply} isLeft={isLeft} closeReply={closeReply}
				chatId={chatId} personId={personId}
				msg={msg} setMsg={setMsg}
				chatMessages={chatMessages} setChatMessages={setChatMessages}
				setChatId={setChatId} setPersonId={setPersonId} />

		</View>
	);
};

export default MessagesScreen;
