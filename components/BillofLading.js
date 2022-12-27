import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";

import React from "react";
import * as MediaLibrary from "expo-media-library";
import { captureScreen } from "react-native-view-shot";
import { DataTable, TouchableRipple } from "react-native-paper";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import ZigzagView from "react-native-zigzag-view";

import moment from "moment";
import QRCode from "react-native-qrcode-svg";

const optionsPerPage = [2, 3, 4];

const BillofLading = ({ navigation, route }) => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [receivedData, setData] = React.useState(route.params);
  console.log(route.params);
  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const savePDF = async (html) => {
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
            console.log("HERE2");
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

  return (
    <ScrollView style={{ marginTop: 30 }}>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          display: "flex",
        }}
      >
        <TouchableRipple
          style={{
            elevation: 5, width: "15%",
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
            savePDF();
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
          Bill of Lading
        </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          IFLA
        </Text>
        <View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Date</Text>
          <Text>
            {moment(receivedData.dateTime).utc().format("MMMM Do YYYY, h:mm a")}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ borderWidth: 1, borderColor: "black", padding: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Pickup Address
            </Text>
            <Text>
              {receivedData.pickupAddress.building} {"\n"}
              {receivedData.pickupAddress.street} {"\n"}
              {receivedData.pickupAddress.city}
            </Text>
          </View>
          <View style={{ borderWidth: 1, borderColor: "black", padding: 10 }}>
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
        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Description</Text>
          <Text>{receivedData.shipmentDetails.description}</Text>
        </View>
        <DataTable style={{ borderWidth: 1, borderColor: "black" }}>
          <DataTable.Header>
            <DataTable.Title>Attribute</DataTable.Title>
            <DataTable.Title numeric>Value</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell>Type</DataTable.Cell>
            <DataTable.Cell numeric>
              {receivedData.shipmentDetails.type}
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Storage</DataTable.Cell>
            <DataTable.Cell numeric>
              {receivedData.shipmentDetails.storage}
            </DataTable.Cell>
          </DataTable.Row>

          {receivedData.shipmentDetails.vehicle && (
            <DataTable.Row>
              <DataTable.Cell>Vehicle</DataTable.Cell>
              <DataTable.Cell numeric>
                {receivedData.shipmentDetails.vehicle}
              </DataTable.Cell>
            </DataTable.Row>
          )}
          <DataTable.Row>
            <DataTable.Cell>Weight</DataTable.Cell>
            <DataTable.Cell numeric>
              {receivedData.shipmentDetails.weight} kg
            </DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Dimensions (LXWXH)</DataTable.Cell>
            <DataTable.Cell numeric>
              {receivedData.shipmentDetails.length} X{" "}
              {receivedData.shipmentDetails.width} X{" "}
              {receivedData.shipmentDetails.height}
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
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Payment</Text>
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
          <QRCode value={receivedData._id} />
        </View>
      </ZigzagView>
      <View></View>
    </ScrollView>
  );
};

export default BillofLading;

const styles = StyleSheet.create({});
