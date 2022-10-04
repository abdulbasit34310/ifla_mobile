import React, { useState, useCallback, useEffect, useRef, useMemo, } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Image, } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome, Octicons, Feather, EvilIcons } from 'react-native-vector-icons';

export default function Wallet({ route, navigation }) {
    return (
        <View style={styles.container}>

            <View style={styles.topSection}>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity style={[styles.currentBalanceCard, { backgroundColor: '#00ABB2' }]}>
                        <View>
                            <Text>Current Balance</Text>
                            <Title
                                style={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                }}>
                                PKR.
                            </Title>
                            <EvilIcons name='arrow-right' size={28} style={{ left: 125, top: 90 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.currentBalanceCard, { backgroundColor: 'white' }]}
                        onPress={() => { navigation.navigate('LoadMoneyToWallet') }}>
                        <View>
                            <EvilIcons name='arrow-down' size={28} color={'black'} />
                            <Title
                                style={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    left: 30, top: 110
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
                    Tap the Teal Card to view your Wallet Details and access your card details
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
