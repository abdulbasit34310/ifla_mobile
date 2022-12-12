import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import ChatHeader from "../components/messages/ChatHeader";
import ChatInput from "../components/messages/ChatInput";
import MessagesList from "../components/messages/MessagesList";

const MessagesScreen = ({ navigation, route }) => {
	const [msg, setMsg] = useState();

	const [chatMessages, setChatMessages] = useState([]);

	const [reply, setReply] = useState("");
	const [isLeft, setIsLeft] = useState();

	const swipeToReply = (msg, isLeft) => {
		setReply(msg.length > 50 ? msg.slice(0, 50) + '...' : msg);
		setIsLeft(isLeft);
	};

	const closeReply = () => {
		setReply("");
	};

	// const aaa = () => {
	// 	socket.on('received_message'), (text) => {
	// 		console.log("useEffect -> Recevied Message")
	// 		console.log(text)
	// 		let cloneArr = [...chatMessages]
	// 		setChatMessages(cloneArr.concat({
	// 			user: 0,
	// 			time: "12:09",
	// 			content: text
	// 		}))
	// 	}
	// };
	
	return (
		<View style={{ flex: 1 }}>

			<ChatHeader />
			<TouchableOpacity onPress={aaa} ><Text>dsafda</Text></TouchableOpacity>
			<MessagesList onSwipeToReply={swipeToReply}
				msg={msg} setMsg={setMsg}
				chatMessages={chatMessages} setChatMessages={setChatMessages} />

			<ChatInput reply={reply} isLeft={isLeft} closeReply={closeReply}
				msg={msg} setMsg={setMsg}
				chatMessages={chatMessages} setChatMessages={setChatMessages} />

		</View>
	);
};

export default MessagesScreen;
