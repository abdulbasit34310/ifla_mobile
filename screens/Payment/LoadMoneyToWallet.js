import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions, FlatList, ActivityIndicator, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoadMoneyToWallet = ({ navigation }) => {

  const [getNo, setNo] = React.useState("150");

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
      {
        parseInt(getNo) < 150 || getNo=="" ? (<Text style={{color:"red"}}>Choose an amount more than 150</Text>):null
      }
      <TouchableOpacity style={styles.customButton} disabled={parseInt(getNo) < 150 ? true:false}
        onPress={() => { navigation.navigate("Payment", { getNo: parseInt(getNo) }) }}>
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
            Deposit
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