import {  
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid, 
} from 'react-native'
import React from 'react'
import * as MediaLibrary from "expo-media-library";
import { captureScreen } from "react-native-view-shot";
import { DataTable, TouchableRipple } from "react-native-paper";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import ZigzagView from "react-native-zigzag-view";
import moment from "moment";

const PayReceipt = ({route, navigation}) => {
  const [date,setDate] = React.useState(Date.now())
  const [receivedData, setData] = React.useState(route.params.item);

  const saveSS = async (html) => {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    }).then(
      async (uri, error) => {
        console.log("Image saved to", uri);
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          let abc = await MediaLibrary.createAssetAsync(uri).then((res) => {
            console.log(res);
            ToastAndroid.showWithGravity(
              "Screenshot Saved",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            );
          });
        }
      }

      // (error) => console.error("Oops, snapshot failed", error)
    );
  };

  return (<ScrollView style={{ marginTop: 30 }}>
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        display: "flex",
      }}
    >
      <TouchableRipple
        style={{
          width: "12%",
          borderRadius: 14,
          padding: 7,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Entypo name="chevron-small-left" size={34} />
      </TouchableRipple>

      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 14,
          elevation: 5,
          padding: 5,
          backgroundColor: "#068E94",
        }}
        onPress={() => {
          saveSS();
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons name="payments" size={18} color={"white"} />
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: 16,
                fontWeight: "bold",
                marginHorizontal: 5,
                color: "white",
              },
            ]}
          >
            Screenshot
          </Text>
        </View>
      </TouchableOpacity>
    </View>
    {/* <View
      style={{
        backgroundColor: "white",
        elevation: 20,
        padding: 20,
        border: "3px solid black",
      }}
    > */}
    <ZigzagView surfaceColor="#FFF" style={{ padding: 10 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        IFLA
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Payment Receipt
      </Text>
      <View>
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Date</Text>
        <Text>
          {moment(date).utc().format("MMMM Do YYYY, h:mm a")}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "black",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "bold" }}>Status</Text>
        <Text>{receivedData.payment.status}</Text>
      </View>
      <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent:"center"
          }}
        >
          <View style={{ width:"50%", borderWidth: 1, borderColor: "black", padding: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Pickup Address
            </Text>
            <Text>
              {receivedData.pickupAddress.building} {"\n"}
              {receivedData.pickupAddress.street} {"\n"}
              {receivedData.pickupAddress.city}
            </Text>
          </View>
          <View style={{ width:"50%", borderWidth: 1, borderColor: "black", padding: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Dropoff Address
            </Text>
            <Text>
              {receivedData.dropoffAddress.building} {"\n"}
              {receivedData.dropoffAddress.street} {"\n"}
              {receivedData.dropoffAddress.city}
            </Text>
          </View>
        </View>
      <DataTable style={{ borderWidth: 1, borderColor: "black" }}>
        <DataTable.Header>
          <DataTable.Title>Attribute</DataTable.Title>
          <DataTable.Title numeric>Value</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Weight</DataTable.Cell>
          <DataTable.Cell numeric>
            {receivedData.shipmentDetails.weight} kg
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Distance</DataTable.Cell>
          <DataTable.Cell numeric>
            {receivedData.shipmentDetails.travelDistance} km
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Paid on</DataTable.Cell>
          <DataTable.Cell>
          {moment(receivedData.payment.dateTime).utc().format("MMMM Do 'YY,h:mm a")}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Booking Fare</DataTable.Cell>
          <DataTable.Cell numeric>
            Rs. {receivedData.payment.amount}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Insurance</DataTable.Cell>
          <DataTable.Cell numeric>
            {receivedData.shipmentDetails.isInsured ? "Yes" : "No"}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>

      <View
        style={{
          marginTop: 4,
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
          padding: 5,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Total Amount</Text>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {" "}
          {receivedData.payment.amount} Rs
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
        }}
      >
      </View>
    </ZigzagView>
    <View></View>
  </ScrollView>
  )
}

export default PayReceipt

const styles = StyleSheet.create({})