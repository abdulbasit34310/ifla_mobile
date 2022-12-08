import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text,Title, TouchableRipple } from "react-native-paper";
import { Entypo, EvilIcons } from '@expo/vector-icons';
// import { EvilIcons } from 'react-native-vector-icons';
import axios from "axios";
import { REST_API_LOCAL } from "@env";
import * as SecureStore from "expo-secure-store";

export default function Wallet({ route, navigation }) {
    const [balance, setBalance] = React.useState(route.params.user.wallet)
    // if(route.params.user.wallet)
    //     setBalance(route.params.user.wallet)
    async function getBalance() {
        let token1 = await SecureStore.getItemAsync("userToken");
        const headers = { Authorization: `Bearer ${token1}` };
        const response = await axios.get(`${REST_API_LOCAL}/payments/getBalance`, {
            withCredentials: true,
            headers: headers,
        });
        setBalance(response.data.wallet)
    }

    React.useEffect(()=>{
        navigation.addListener("focus", () => {
            getBalance()
        });
    },[navigation])

    return (
        <View style={styles.container}>

            <View style={{ padding: 5, paddingBottom: 15 }}>
                <TouchableRipple style={{ width: '12%', borderRadius: 14, padding: 7, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }} onPress={() => {
                    navigation.goBack();
                }}>
                    <Entypo name='chevron-small-left' size={34} />
                </TouchableRipple>
            </View>

            <View style={styles.topSection}>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity onPress={()=>navigation.navigate("PaymentHistory")} style={[styles.currentBalanceCard, { backgroundColor: '#00ABB2' }]}>
                        <View>
                            <Text>Current Balance</Text>
                            <Title
                                style={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                }}>
                                PKR.{balance}
                            </Title>
                            <EvilIcons name='arrow-right' size={28} style={{ left: "80%", top: 90 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.currentBalanceCard, { backgroundColor: 'white' }]}
                        onPress={() => { navigation.push('LoadMoneyToWallet') }}>
                        <View>
                            <EvilIcons name='arrow-down' size={28} color={'black'} />
                            <Title
                                style={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    left: "5%", top: 110
                                }}>
                                Load Money
                            </Title>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.bottomSection}>
                <View style={{ backgroundColor: '#00ABB2', padding: 5, borderRadius: 14, alignSelf: 'center', margin: 10 }}>
                    <EvilIcons name='arrow-right' size={28} color={'white'} />
                </View>

                <Text style={{ color: 'grey', width: 300, alignSelf: 'center', }}>
                    Tap the Teal Card to view your Payment History
                </Text>

                <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 14, alignSelf: 'center', margin: 10 }}>
                    <EvilIcons name='arrow-down' size={28} />
                </View>

                <Text style={{ color: 'grey', width: 300, alignSelf: 'center', }}>
                    Tap the White Card to see the options for loading balance to your account
                </Text>
            </View>
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0EFF6',
        padding: 15,
    },
    currentBalanceCard: {
        elevation: 5,
        padding: 15,
        borderRadius: 14,
        margin: 5,
        width: '47%',
        height: '175%',

    },
    topSection: {
        flex: 1,
    },
    bottomSection: {
        flex: 1,
    },
});
