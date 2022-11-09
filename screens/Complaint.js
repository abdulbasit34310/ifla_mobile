import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Animated, ActivityIndicator, Alert, Button, Dimensions, FlatList, Image, StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome, FontAwesome5, FontAwesome5Brands, Fontisto, Foundation, Ionicons, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

function Complaint() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.card}>
                <FontAwesome name='wrench' size={48} color={'#31302C'} />
                <Text style={{ fontSize: 42, color: '#31302C', fontWeight: "bold", marginVertical: 15 }}>Report {'\n'} an issue
                </Text>
                <Text style={{ fontSize: 16, color: 'grey', marginBottom: 15 }}> Sorry to hear that you have a problem. {'\n'} Our technician is here to help you.</Text>

                <TextInput
                    style={styles.ti}
                    placeholder="Write your Complaint..."
                    placeholderTextColor="#666666"
                >
                </TextInput>

                <View>
                    <TouchableOpacity style={styles.to}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 35,
        backgroundColor: "#00ABB2",
    },
    card: {
        backgroundColor: "#E0EFF6",
        height: '100%',
        borderRadius: 14,
        padding: 15,
    },
    ti: {
        borderWidth: 1,
        borderColor: "#AAAAAA",
        borderRadius: 5,
        height: '45%',
        padding: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold", marginHorizontal: 5, color: 'white'
    },
    to: {
        backgroundColor: '#068E94',
        marginTop: 25,
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 14,
        elevation: 5,
    },
})

export default Complaint