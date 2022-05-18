import * as React from 'react';
import {
    Text, View, StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
const PUBLISHABLE_KEY = "pk_test_51KEBKKEaKSJeoPtKDUVrGpCvY5CyR40zYsTbaFjbAIcv4ii8f2uY0t6omkYUPfvxzJvTaZLbhVO3FEFWTH7TbmJN00R6zJ0ytm"

const FIREBASE_API_ENDPOINT = 'https://freight-automation-default-rtdb.firebaseio.com/';


export default function Payment({ navigation, route }) {


    const [bookingData, setBookingData] = React.useState({});
    const [name, setName] = React.useState();
    const [paymentTime, setPaymentTime] = React.useState(new Date());
    const { confirmPayment, loading } = useConfirmPayment();
    const { Offer } = bookingData;

    const getBookingsData = async () => {
        const id = route.params;
        console.log(id);
        const response = await fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`);
        const data = await response.json();
        setBookingData(data);

    };

    React.useEffect(() => {
        getBookingsData();
    }, [setBookingData]);

    const changeStatus = () => {
        const id = route.params;
        var data = bookingData;
        data["Status"] = "Finished";
        var requestOptions = {
            method: 'PATCH',
            body: JSON.stringify(data),

        };

        fetch(`${FIREBASE_API_ENDPOINT}/bookings/${id}.json`, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
    }



    const handlePayments = () => {
        const id = route.params;
        var paymentData = {
            Cardholder: name,
            Payment: Offer,
            PaymentDate: paymentTime.toDateString(),
            PaymentTime: paymentTime.toTimeString(),
            Booking: id
        }
        var requestOptions = {
            method: 'POST',
            body: JSON.stringify(paymentData),
        };

        fetch(`${FIREBASE_API_ENDPOINT}/payments.json`, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));

        changeStatus();

    };


    //   const handlePayments = async() => {
    //     const response = await fetch("https://api.stripe.com/v1/create-payment-intent",{
    //       method: "POST",
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         paymentMethodType: 'card', 
    //         currency: 'usd'
    //       })
    //     })
    //     const {clientsecret}  = await response.json();
    //     const {error, paymentIntent} = await confirmPayment(clientsecret,{
    //       type: 'Card',
    //       billingDetails: {name}
    //     })
    //     if(error){
    //       Alert.alert(`Error code: ${error.code} `, error.message);
    //     }else if(paymentIntent){
    //       Alert.alert('Success', `Payment Successful: ${paymentIntent.id}`);
    //     }
    //  }

    return (
        <StripeProvider publishableKey={PUBLISHABLE_KEY}>
            <ScrollView>
                <View style={{ padding: 20, marginTop: 20 }}>
                    <Text style={{ fontSize: 40, alignSelf: "center", backgroundColor: "#066145", color: "white", borderRadius: 15, padding: 10 }}>{bookingData.Offer} Rs</Text>

                    <Text style={{ fontSize: 15, alignSelf: "center", color: "#066145", borderRadius: 15, padding: 10 }}>{paymentTime.toDateString()}, {paymentTime.toTimeString()}</Text>

                    <Text style={{ padding: 10 }}>Cardholder Name </Text>
                    <TextInput
                        style={styles.textInput}
                    />
                    <CardField postalCodeEnabled={false} style={{ width: "90%", height: 40, marginVertical: 30, marginLeft: 10 }}
                        cardStyle={{ borderColor: "#066145", borderWidth: 1, borderRadius: 5 }}
                    />

                    <TouchableOpacity style={{
                        marginTop: 20,
                        padding: 10,
                        backgroundColor: "#0B9F72",
                        width: 200,
                        alignSelf: 'center',
                        borderRadius: 10
                    }}
                        onPress={() => { handlePayments(); navigation.goBack(); }}
                        disabled={loading}
                    >
                        <Text style={{ alignSelf: "center", color: 'white' }}>Pay</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </StripeProvider>
    );
};


const styles = StyleSheet.create({
    textInput: {
        borderColor: '#066145',
        borderWidth: 1,
        padding: 3,
        marginLeft: 10,
        width: '90%',
        borderRadius: 4,
    },
    textInput2: {
        borderColor: '#066145',
        borderWidth: 1,
        padding: 3,
        marginLeft: 10,
        width: '30%',
        borderRadius: 4,
    },
    buttonStyle: {
        backgroundColor: '#0B9F72',
        padding: 10,
        width: 100,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonText: {
        alignSelf: 'center', color: 'white'
    },
    checkBox: {

        borderWidth: 0,
        padding: 0,
        backgroundColor: 'white',
        marginTop: 20

    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
});



