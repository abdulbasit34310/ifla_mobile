import * as React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import logo from './images/IFLA.png';


const BookingScreen = ({ navigation, route }) => {
    return (
        <View style={{ padding: 15, backgroundColor: "#00ABB2", height: '100%' }}>
            <Image
                style={{
                    backgroundColor: "#00ABB2",
                    width: 335,
                    height: 275,
                    alignSelf: 'center',
                    marginBottom: 75,
                    borderRadius: 5,
                }}
                source={logo}
            />
            <View>
                <View
                    style={{
                        marign: 50,
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={styles.mainButtons}
                            onPress={() => {
                                console.log('Schedule.Booking.Selected');
                                navigation.navigate('ScheduleBooking');
                            }}>
                            <Text style={styles.mainButtonText}>Schedule Booking</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.mainButtons}
                            onPress={() => navigation.navigate('GetAQuote')}>
                            <Text style={styles.mainButtonText}>Generate a quote</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={styles.mainButtons}
                            onPress={() => {
                                navigation.navigate('PendingBookings');
                            }}>
                            <Text style={styles.mainButtonText}>Pending Bookings</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.mainButtons}
                            onPress={() => navigation.navigate('MyBookings')}>
                            <Text style={styles.mainButtonText}>My Bookings</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({

    mainButtons: {
        backgroundColor: '#E0EFF6',
        padding: 40,
        width: '45%',
        margin: 10,
        borderRadius: 20,
        elevation: 50,
    },
    mainButtonText: {
        fontSize: 16,
        alignSelf: 'center',
        color: '#005761',
        fontWeight: 'bold',
    },
});

export default BookingScreen;