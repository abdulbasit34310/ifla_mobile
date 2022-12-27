import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native'
import React, { useEffect } from 'react'
import axios from 'axios'
import { REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";
import { Entypo } from '@expo/vector-icons';
import { TouchableRipple } from "react-native-paper";
import moment from "moment";

const PaymentHistory = ({navigation}) => {
  const [data,setData] = React.useState(null)
  const [loading, setLoading] = React.useState(false);

  const getData = async ()=>{
    setLoading(true);

    let token1 = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token1}` };
    const response = await axios.get(`${REST_API_LOCAL}/payments/payHistory`, {
      withCredentials: true,
      headers: headers,
    });
    setData(response.data)
    setLoading(false);
  }

  useEffect(()=>{
    // navigation.addListener("focus", () => {
      getData();
    // });
  },[])

  return (
      <View style={styles.container}>
        
       <View style={{ paddingBottom: 15, paddingTop: 10 }}>
          <TouchableRipple style={{ width: '15%', borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
            navigation.goBack();
          }}>
            <Entypo name='chevron-small-left' size={34} />
          </TouchableRipple>
        </View>
        <Text style={{
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#005761",
    paddingBottom: 10
  }}>Payment History</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          refreshing={false}
          onRefresh={getData}
          keyExtractor={(item, index) => index}
          data={data}
          ListEmptyComponent={
            <Text style={{ fontSize: 24, alignSelf: "center", marginTop: 30 }}>
              No Payments Found
            </Text>
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.flatListStyle}
              onPress={() => {
                navigation.push("PaymentReceipt", { item: item });
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    borderBottomColor: "#AAAAAA",
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 17,
                      color: "#005761",
                    }}
                  >
                    Price
                  </Text>
                  <Text style={styles.paymentStyle}>
                    PKR {item.payment.amount}
                  </Text>
                </View>


                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 10,
                  }}
                >
                  <View>
                    <Text style={styles.heading}>Source</Text>
                    <Text style={styles.cityNameStyle}>
                    {item.pickupAddress.city}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.heading}>Desitination</Text>
                    <Text style={styles.cityNameStyle}>
                    {item.dropoffAddress.city}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: 10,
                  }}
                >
                  <View>
                    <Text style={styles.heading}>Status</Text>
                    <Text style={styles.cityNameStyle}>
                      {item.payment.status}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.heading}>Date</Text>
                    <Text style={styles.cityNameStyle}>
                      {moment(item.payment.dateTime).utc().format("MMM D 'YY")}
                    </Text>
                  </View>
                </View>

              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

export default PaymentHistory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#E0EFF6",
        // justifyContent: "center",
    },
    flatListStyle: {
      padding: 15,
      borderBottomColor: "#005761",
      backgroundColor: "white",
      margin: 5,
      borderRadius: 10,
      elevation: 8,
    },
    paymentStyle: { fontSize: 15, fontWeight: "bold", color: "#00ABB2" },
    heading: { color: "#AAAAAA", fontSize: 12 },
    cityNameStyle: { color: "#005761", fontWeight: "bold" },
})