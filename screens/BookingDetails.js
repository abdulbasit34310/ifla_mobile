import * as React from 'react';
import {
  Text, View,
  TouchableOpacity,
  ScrollView, Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';

export default function BookingDetails({ navigation, route }) {
  const id = route.params;
  const [bookingData, setBookingData] = React.useState({});
  const [driverData, setDriverData] = React.useState({ Name: '', Contact: '', VehicleNo: '' });
  const { PickUpAddress, DropoffAddress, PickupCity, DropoffCity, Description, Vehicle, Offer, Weight, Status, Date, Time } = bookingData;
  const { Name, Contact, VehicleNo } = driverData;

  const getBookingsData = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`);
    const data = await response.json();

    console.log(data);
    setBookingData(data);
    console.log(data.Driver);
    const driverresponse = await fetch(`${FIREBASE_API_ENDPOINT}/drivers/${data.Driver}.json`);
    const driData = await driverresponse.json();
    console.log(driData);
    setDriverData(driData);

  };
  const deleteData = () => {
    var requestOptions = {
      method: 'DELETE',
    };

    fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log('Delete Response:', result))
      .catch((error) => console.log('error', error));
  };


  React.useEffect(() => {
    getBookingsData();
  }, [setBookingData]);

  return (

    <View style={{ backgroundColor: 'lightgrey', height: "100%" }}>
      <ScrollView>
        <Text style={{ fontSize: 40, marginTop: 20, alignSelf: "center", backgroundColor: "#066145", color: "white", borderRadius: 15, padding: 10 }}>{Offer} Rs</Text>
        <Text style={{ fontSize: 16, alignSelf: "center", color: "#066145", borderRadius: 15, padding: 10, fontWeight: "bold" }}>{Date}, {Time}</Text>

        <View style={{ backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Source </Text>
          <Text style={{ fontSize: 20, marginLeft: 50, marginTop: 5 }} >{PickupCity}, {PickUpAddress}</Text>

          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10, marginLeft: 10, marginHorizontal: 10 }}>Desitination </Text>
          <Text style={{ fontSize: 20, marginLeft: 50, marginTop: 5 }} >{DropoffCity}, {DropoffAddress}</Text>
        </View>
        <View style={{ backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Description </Text>
          <Text style={{ fontSize: 20, marginLeft: 50, marginTop: 5 }} >{Description}</Text>
        </View>
        <View style={{ backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Driver </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Text style={{ fontSize: 20, marginLeft: 50, marginTop: 5 }} >{Name}</Text>
              <Text style={{ fontSize: 20, marginLeft: 50, marginTop: 5 }} >{Contact}</Text>
              <Text style={{ fontSize: 20, marginLeft: 50, marginTop: 5 }} >{VehicleNo}</Text>
            </View>
            <Icon
              name="truck"
              type="font-awesome"
              size={40}
              color='#0B9F72'
              style={{ margin: 10, fontSize: 30 }}
            />

          </View>
        </View>
        <View style={{ backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal: 10, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Vehicle Type </Text>
          <Text style={{ fontSize: 16, marginRight: 20, backgroundColor: '#0B9F72', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5 }} >{Vehicle}</Text>
        </View>
        <View style={{ backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal: 10, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Status </Text>
          <Text style={{ fontSize: 16, marginRight: 20, backgroundColor: '#0B9F72', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5 }} >{Status}</Text>
        </View>
        <View style={{ backgroundColor: 'white', padding: 10, margin: 2, marginHorizontal: 10, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>Weight </Text>
          <Text style={{ fontSize: 16, marginRight: 20, backgroundColor: '#0B9F72', color: "white", fontWeight: "bold", padding: 10, borderRadius: 5 }} >{Weight} kg</Text>
        </View>
        <TouchableOpacity onPress={() => {
          Alert.alert(
            'Cancel Booking',
            "Are you sure?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Confirm", onPress: () => { deleteData(); navigation.goBack(); } }
            ]
          )
        }} style={{ marginTop: 20, padding: 10, marginBottom: 20, backgroundColor: "#0B9F72", width: 200, alignSelf: 'center', borderRadius: 5 }}><Text style={{ alignSelf: 'center', color: "white", fontWeight: "bold", fontSize: 18 }}>Delete Record</Text></TouchableOpacity>

      </ScrollView>
    </View>

  )
}
