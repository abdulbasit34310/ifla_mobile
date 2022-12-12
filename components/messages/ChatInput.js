import React, { useState, useEffect, useRef, memo } from "react";
import { ActivityIndicator, Alert, Button, Dimensions, FlatList, ImageBackground, Image, ImageScrollView, Picker, Platform, StyleSheet, Switch, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Animated, {
	useSharedValue,
	withSpring,
	withTiming,
	useAnimatedStyle,
} from "react-native-reanimated";
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';


const ChatInput = ({ reply, closeReply, isLeft, msg, setMsg, chatMessages, setChatMessages }) => {

	const handleNewMessage = () => {
		// const hour =
		// 	new Date().getHours() < 10
		// 		? `0${new Date().getHours()}`
		// 		: `${new Date().getHours()}`; 

		// const mins =
		// 	new Date().getMinutes() < 10
		// 		? `0${new Date().getMinutes()}`
		// 		: `${new Date().getMinutes()}`;
		console.log("HandleNewMessage")
		// socket.emit("send_message", msg);

		setMsg("");
	};

	return (
		<Animated.View style={[styles.container]}>
			{reply ? (
				<View style={styles.replyContainer}>
					<TouchableOpacity
						onPress={closeReply}
						style={styles.closeReply}
					>
						<AntDesign name="close" color="#000" size={20} />
					</TouchableOpacity>
					<Text style={styles.title}>
						Response to {isLeft ? username : "Me"}
					</Text>
					<Text style={styles.reply}>{reply}</Text>
				</View>
			) : null}

			<View style={styles.innerContainer}>
				<View style={styles.action}>
					<TextInput
						multiline
						placeholder={"Message"}
						style={styles.input}
						value={msg}
						onChangeText={(a) => { setMsg(a) }}
					/>

				</View>

				<TouchableOpacity style={styles.sendButton}
					onPress={handleNewMessage}
				>
					<Ionicons
						name={"send-outline"}
						size={23}
						color={"white"}
					/>
				</TouchableOpacity>
			</View>

		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		backgroundColor: "white",

	},
	replyContainer: {
		paddingHorizontal: 15,
		marginHorizontal: 15,
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: '#f0f0f0',
		borderRadius: 14
	},
	title: {
		marginTop: 5,
		fontWeight: "bold",
	},
	closeReply: {
		position: "absolute",
		right: 10,
		top: 5,
	},
	reply: {
		marginTop: 5,
	},
	innerContainer: {
		paddingVertical: 10,
		marginHorizontal: 10,
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
		paddingVertical: 10,
	},
	action: {
		flexDirection: "row",
		backgroundColor: '#f0f0f0',
		flex: 3,
		marginRight: 10,
		paddingVertical: Platform.OS === "ios" ? 10 : 0,
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "space-between",
	},
	input: {
		backgroundColor: "transparent",
		paddingLeft: 20,
		color: "#000",
		flex: 3,
		fontSize: 15,
		height: 50,
		alignSelf: "center",
	},
	rightIconButtonStyle: {
		justifyContent: "center",
		alignItems: "center",
		paddingRight: 15,
		paddingLeft: 10,
		borderLeftWidth: 1,
		borderLeftColor: "#fff",
	},
	swipeToCancelView: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 30,
	},
	swipeText: {
		color: '#9f9f9f',
		fontSize: 15,
	},
	emoticonButton: {
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 10,
	},
	recordingActive: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 10,
	},
	recordingTime: {
		color: '#9f9f9f',
		fontSize: 20,
		marginLeft: 5,
	},
	microphoneAndLock: {
		alignItems: "center",
		justifyContent: "flex-end",
	},
	lockView: {
		backgroundColor: "#eee",
		width: 60,
		alignItems: "center",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		height: 130,
		paddingTop: 20,
	},
	sendButton: {
		backgroundColor: '#00ABB2',
		borderRadius: 50,
		height: 50,
		width: 50,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ChatInput;
