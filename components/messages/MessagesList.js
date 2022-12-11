import React, { useState, useRef, useEffect } from "react";
import { ScrollView } from "react-native";

import Message from "./Message";
import socket from "../socket";

const MessagesList = ({ onSwipeToReply, chatMessages, setChatMessages }) => {
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

	const user = useRef(0);
	const scrollView = useRef();

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
					time={message.time}
					isLeft={message.user !== user.current}
					message={message.content}

				/>
			))}
		</ScrollView>
	);
};

export default MessagesList;
