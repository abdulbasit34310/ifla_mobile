import * as React from "react";
import { StyleSheet, ActivityIndicator, ToastAndroid } from "react-native";

import axios from "axios";
import { REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";

import GoodsDetails from "../../components/ScheduleBooking/GoodDetails";
import ShipmentDetails from "../../components/ScheduleBooking/ShipmentDetails";
import ScheduleDetails from "../../components/ScheduleBooking/ScheduleDetails";
import PreviewBooking from "../../components/ScheduleBooking/PreviewBooking";


const Success = ({
  navigation,
  nextStep,
  prevStep,
  setBooking,
  bookingData,
}) => {
  return <div> Booking Done Successfully</div>;
};

export default function ScheduleBooking({ route, navigation }) {
  console.log(route.params.shipperInsurance);

  const [step, setStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  var quote = "";
  if (route.params.item) {
    quote = {
      type: route.params.item.shipmentDetails.type,
      step1: step,
      pickupAddress: route.params.item.pickupAddress,
      dropoffAddress: route.params.item.dropoffAddress,
      goodsType: "",
      description: "",
      weight: route.params.item.shipmentDetails.weight,
      height: "",
      quantity: route.params.item.shipmentDetails.quantity,
      vehicle: "",
      length: "",
      width: "",
      storage: "",
      isInsured: false,
      date: date.toDateString(),
      time: date.toTimeString(),
      status: "Pending",
      package: true,
      packageName: "",
      packageType: "",
      amount: route.params.item.payment.amount,
    };
  } else {
    quote = {
      type: "",
      step1: step,
      pickupAddress: "",
      dropoffAddress: "",
      goodsType: "",
      description: "",
      weight: "",
      height: "",
      quantity: "",
      vehicle: "",
      length: "",
      width: "",
      storage: "",
      isInsured: false,
      date: date.toDateString(),
      time: date.toTimeString(),
      status: "Pending",
      package: true,
      packageName: "",
      packageType: "",
      amount: "",
    };
  }
  const [bookingData, setBooking] = React.useState(quote);

  const clear = () => {
    setBooking({
      type: "",
      pickupAddress: "",
      dropoffAddress: "",
      vehicle: "",
      description: "",
      weight: "",
      offer: "",
      isInsured: false,
      date: date.toDateString(),
      time: date.toTimeString(),
      status: "Pending",
    });
  };

  const postData = async () => {
    let token1 = await SecureStore.getItemAsync("userToken");
    const body = bookingData;
    const headers = { Authorization: `Bearer ${token1}` };
    try {
      let res = await axios.post(
        `${REST_API_LOCAL}/shipper/saveBookingMobile`,
        body,
        { withCredentials: true, headers: headers }
      );
      console.log(res.data);
      if (Platform.OS == 'android') {
        ToastAndroid.showWithGravity(
          "Booking Saved",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
      navigation.goBack();
    } catch (error) {
      console.log(error.response.data);
    }
  };


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
        <>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <ShipmentDetails
              navigation={navigation}
              nextStep={nextStep}
              bookingData={bookingData}
              setBooking={setBooking}
              shipperInsurance={shipperInsurance}
            />
          )}
        </>
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