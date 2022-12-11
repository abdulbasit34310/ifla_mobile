import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

import Conversations from '../components/Conversations';

const ConversationsScreen = () => {
	return (
		<View style={{ backgroundColor: "white", flex: 1 }}>
			<Conversations />
		</View>
	)
}

export default ConversationsScreen