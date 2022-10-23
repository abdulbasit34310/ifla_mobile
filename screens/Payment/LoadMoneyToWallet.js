import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, FlatList, ActivityIndicator, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

import RadioButton from './RadioButton';

const LoadMoneyToWallet = ({ navigation }) => {

  const [getNo, setNo] = React.useState(0);

  return (
    <View style={styles.container}>

      <Text
        style={[
          styles.buttonText,
          {
            fontSize: 22,
            color: "#AAAAAA",
          },
        ]}
      >
        Enter Amount
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", margin: 20 }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', marginRight: 15 }}>PKR</Text>
        <TextInput
          style={styles.ti}
          value={getNo}
          keyboardType="phone-pad"
          onChangeText={(text) => setNo(text)}
        />
      </View>

      <TouchableOpacity style={styles.customButton}
        onPress={() => { navigation.navigate("Payment", { id: getNo }) }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name="bank-transfer-in" size={26} color={"white"} />
          <Text
            style={[
              styles.buttonText,
              {
                color: "white",
              },
            ]}
          >
            Transfer
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0EFF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButton: {
    width: "85%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 15,
    elevation: 3,
    backgroundColor: "#005761",
  },
  ti: {
    borderBottomWidth: 1,
    width: '35%',
    height: '100%',
    borderBottomColor: "#AAAAAA",
    fontSize: 26,
    color: "#AAAAAA",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
})
export default LoadMoneyToWallet