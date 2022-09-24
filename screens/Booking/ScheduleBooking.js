// Don't proceed to next screen without filling the necessary data, disable the next button

import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  Modal,
  ToastAndroid,
} from "react-native";

import axios from "axios";
import { REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";

import GoodsDetails from "../../components/ScheduleBooking/GoodDetails";
import BookingDetails from "../../components/ScheduleBooking/BookingDetails";
import ScheduleDetails from "../../components/ScheduleBooking/ScheduleDetails";
import PreviewBooking from "../../components/ScheduleBooking/PreviewBooking";
const Success = ({
  navigation,
  nextStep,
  prevStep,
  setBooking,
  bookingData,
}) => {
  return <div>Booking Done Succsfully</div>;
};

export default function ScheduleBooking({ route, navigation }) {
  const [step, setStep] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  //const [token,setToken] = React.useState(route.params.token)
  // async function getValueFor(key) {
  //     let result = await SecureStore.getItemAsync(key);
  //     if (result) {
  //         setToken(result)
  //     } else {
  //         navigation.navigate("RegisteringScreen")
  //     }
  //   }

  // React.useEffect(()=>{
  //     navigation.addListener('focus', () => {
  //         getValueFor('token')
  //       });
  // },[navigation])

  const [bookingData, setBooking] = React.useState({
    type: "LTL",
    step1: step,
    pickupAddress: "",
    dropoffAddress: "",
    goodsType: "",
    description: "",
    weight: "",
    height: "",
    vehicle: "",
    length: "",
    width: "",
    date: date.toDateString(),
    time: date.toTimeString(),
    status: "Pending",
    package: false,
    packageName: "",
    packageType: "",
  });

  const clear = () => {
    setBooking({
      type: "",
      pickupAddress: "",
      dropoffAddress: "",
      vehicle: "",
      description: "",
      weight: "",
      vehicle: "",
      offer: "",
      date: date.toDateString(),
      time: date.toTimeString(),
      status: "Pending",
    });
  };

  const postData = async () => {
    const token = getValueFor("userToken");
    let token1 = await SecureStore.getItemAsync("userToken");
    const body = bookingData;
    // body.package = packaging;
    console.log(body);
    const headers = { Authorization: `Bearer ${token1}` };
    try {
      let res = await axios.post(
        `${REST_API_LOCAL}/shipper/saveBookingMobile`,
        body,
        { withCredentials: true, headers: headers }
      );
      console.log(res.data);
      ToastAndroid.showWithGravity(
        "Booking Saved",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      navigation.goBack();
    } catch (error) {
      console.log(error.response.data);
    }

    // let token1 = await SecureStore.getItemAsync("userToken")
    // .then(val=>setToken(val));
    console.log(token1);
    // var obj = {
    //     method: 'POST',
    //     body: JSON.stringify(body),
    //     withCredentials: true,
    //     credentials: 'include',
    //     headers: {
    //         'Authorization': `Bearer ${token1}`
    //     }
    //   }
    // const response =
    // fetch(`${REST_API_LOCAL}/shipper/saveBookingMobile`, obj).then(response => console.log(response.json())).catch(err => console.log(err))
    // const token = getValueFor('userToken')
    // const headers = { "Authorization": `Bearer ${token}` }
    // const response = await axios.get(`${REST_API_LOCAL}/shipper/getPendingBookings`, { headers: headers });
    // const data = await response.data.bookings;
    // let data = await response.json()
    // console.log(data)
  };

  async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    } else {
      return "Token not in SecureStore";
    }
  }

  const prevStep = () => {
    const { step1 } = bookingData;
    setBooking({ ...bookingData, step1: step1 - 1 });
  };

  const nextStep = () => {
    const { step1 } = bookingData;
    setBooking({ ...bookingData, step1: step1 + 1 });
  };

  const { step1 } = bookingData;

  switch (step1) {
    case 0:
      return (
        <BookingDetails
          nextStep={nextStep}
          bookingData={bookingData}
          setBooking={setBooking}
        />
      );
    case 1:
      return (
        <GoodsDetails
          nextStep={nextStep}
          prevStep={prevStep}
          bookingData={bookingData}
          setBooking={setBooking}
        />
      );
    case 2:
      return (
        <ScheduleDetails
          nextStep={nextStep}
          prevStep={prevStep}
          bookingData={bookingData}
          setBooking={setBooking}
          date={date}
          setDate={setDate}
          postData={postData}
        />
      );
    case 3:
      return (
        <PreviewBooking
          nextStep={nextStep}
          prevStep={prevStep}
          bookingData={bookingData}
          setBooking={setBooking}
          postData={postData}
        />
      );
    case 4:
      return (
        <Success
          nextStep={nextStep}
          prevStep={prevStep}
          bookingData={bookingData}
          setBooking={setBooking}
        />
      );
    default:
    //do nothing
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: "#005761",
    borderWidth: 1,
    padding: 3,
    marginLeft: 10,
    width: "90%",
    borderRadius: 4,
  },
  buttonStyle: {
    backgroundColor: "#068E94",
    padding: 10,
    width: 100,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  buttonText: {
    alignSelf: "center",
    color: "white",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  centeredView: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  countryLabel: {
    width: "100%",
    padding: 10,
    borderColor: "#005761",
    borderWidth: 1,
    marginBottom: 1,
    borderRadius: 10,
  },
});
