import React, { useState, useRef, useEffect } from "react";
import { ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from 'axios';
import moment from "moment";

const REST_API_LOCAL = "http://192.168.0.100:4000";

import Message from "./Message";

const MessagesList = ({ navigation, onSwipeToReply, chatMessages, setChatMessages, setChatId, personId, setPersonId }) => {
	// const [messages, setMessages] = useState([
	// 	{
	// 		user: 0,
	// 		time: "12:00",
	// 		content: "Hey!",
	// 	},
	// 	{
	// 		user: 1,
	// 		time: "12:05",
	// 		content: "What's up",
	// 	},
	// 	{
	// 		user: 1,
	// 		time: "12:07",
	// 		content: "How is it going?",
	// 	},
	// 	{
	// 		user: 0,
	// 		time: "12:09",
	// 		content: "things are going great",
	// 	},
	// 	{
	// 		user: 0,
	// 		time: "12:00",
	// 		content: "Good :)",
	// 	},
	// 	{
	// 		user: 1,
	// 		time: "12:05",
	// 		content: "Should we hang out tomorrow? I was thinking of watching netflix and chill",
	// 	},
	// 	{
	// 		user: 0,
	// 		time: "12:07",
	// 		content: "Sure",
	// 	},
	// 	{
	// 		user: 1,
	// 		time: "12:09",
	// 		content: "Great",
	// 	},
	// 	{
	// 		user: 0,
	// 		time: "12:07",
	// 		content: "7 o'clock?",
	// 	},
	// 	{
	// 		user: 1,
	// 		time: "12:09",
	// 		content: "Sounds good",
	// 	},
	// ]);

	// useEffect(() => {
	// 	socket.on('send_message'), (text) => {
	// 		console.log("useEffect -> Recevied Message")
	// 		console.log(text)
	// 		let cloneArr = [...chatMessages]
	// 		setChatMessages(cloneArr.concat({
	// 			user: 0,
	// 			time: "12:09",
	// 			content: text
	// 		}))
	// 	}
	// }, [setChatMessages])


	// console.log("Get Chats Function");

	// let token1 = await SecureStore.getItemAsync("userToken");
	// const headers = { Authorization: `Bearer ${token1}` };

	// const res = await axios.get(`${REST_API_LOCAL}/users/getUser`, {
	// 	withCredentials: true,
	// 	headers: headers,
	// });
	// const data = await res.data;

	// const response = await axios.get(`${REST_API_LOCAL}/chat/user/${data.personId._id}`, {
	// 	withCredentials: true,
	// 	headers: headers,
	// });
	// setChatId(response.data[0]._id);

	// setChatMessages(response.data[0].messages);

	const user = useRef(0);
	const scrollView = useRef();

	const getChats = async () => {
		let token1 = await SecureStore.getItemAsync("userToken");
		const headers = { Authorization: `Bearer ${token1}` };

		const res = await axios.get(`${REST_API_LOCAL}/users/getUser`, {
			withCredentials: true,
			headers: headers,
		});
		const user = await res.data.personId;
		setPersonId(user._id);
		const response = await axios.get(`${REST_API_LOCAL}/chat/user/${user._id}`, {
			withCredentials: true,
			headers: headers,
		});
		setChatId(response.data[0]._id);
		setChatMessages(response.data[0].messages);
		console.log(chatMessages);
	};

	useEffect(() => {
		navigation.addListener("focus", () => {
			getChats();
		});
	}, [chatMessages]);

	return (
		<ScrollView style={{ backgroundColor: "white", flex: 1 }}
			ref={ref => scrollView.current = ref}
			onContentChange={() => {
				scrollView.current.scrollToEnd({ animated: true })
			}}
		>
			{chatMessages.map((message, index) => (
				<Message
					key={index}
					onSwipe={onSwipeToReply}
					time={moment(message.timeSent)
						.local()
						.format("hh:mm a, DD/MM/YY")}
					isLeft={message.senderId !== personId}
					message={message.msgBody}

				/>
			))}
		</ScrollView>
	);
};

export default MessagesList;
