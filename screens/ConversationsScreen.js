import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/MaterialIcons';

import Conversations from '../components/Conversations';

const ConversationsScreen = () => {
	return (
		<View style={{ backgroundColor: "white", flex: 1 }}>
			<Conversations />
		</View>
	)
}

export default ConversationsScreen