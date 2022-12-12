import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

const ChatHeader = () => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>

			<TouchableOpacity style={styles.backButton} onPress={() => {
				navigation.goBack();
			}}>
				<Entypo name='chevron-small-left' size={34} color={"white"} />
			</TouchableOpacity>

			<View style={styles.profileOptions}>
				<TouchableOpacity style={styles.profile}>
					<View style={styles.usernameAndOnlineStatus}>
						<Text style={styles.username}>Admin</Text>
					</View>
				</TouchableOpacity>

			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: '#00ABB2',
		 padding: 15
	},
	backButton: {
		alignSelf: "center",
		
	},
	profileOptions: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
	},
	profile: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: "#fff",
		flex: 4,
	},
	image: {
		height: 65,
		width: 65,
		borderRadius: 32.5,
	},
	usernameAndOnlineStatus: {
		flexDirection: "column",
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	username: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
	onlineStatus: {
		color: "white",
		fontSize: 16,
	},
	options: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
});

export default ChatHeader;
