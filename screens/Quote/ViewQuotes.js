import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Entypo } from '@expo/vector-icons';
import { TouchableRipple } from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { REST_API_LOCAL } from "@env";

export default function ViewQuotes({ navigation, route }) {
  const [quoteData, setQuoteData] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const getQuoteData = async () => {
    setLoading(true);

    let token = await SecureStore.getItemAsync("userToken");
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.get(`${REST_API_LOCAL}/shipper/getQuotes`, {
      withCredentials: true,
      headers: headers,
    });
    const data = await response.data.bookings;

    setQuoteData(data);
    setLoading(false);
  };

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      getQuoteData();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
       <View style={{ paddingBottom: 15, paddingTop: 10 }}>
          <TouchableRipple style={{ width: '12%', borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
            navigation.goBack();
          }}>
            <Entypo name='chevron-small-left' size={34} />
          </TouchableRipple>
        </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          refreshing={false}
          onRefresh={getQuoteData}
          keyExtractor={(item, index) => index}
          data={quoteData}
          ListEmptyComponent={
            <Text style={{ fontSize: 24, alignSelf: "center", marginTop: 30 }}>
              No Bookings Found
            </Text>
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.flatListStyle}
              onPress={() => {
                navigation.push("QuoteDetails", { item: item });
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
                    Estimated Price
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
                    <Text style={styles.heading}>Type</Text>
                    <Text style={styles.cityNameStyle}>
                      {item.shipmentDetails.type}
                    </Text>
                  </View>
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
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#E0EFF6", height: "100%", padding: 15 },
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
  statusStyle: {
    fontSize: 12,
    margin: 5,
    color: "white",
    fontWeight: "bold",
    padding: 5,
    elevation: 5,
    borderRadius: 3,
    backgroundColor: "#068E94",
  },
});
