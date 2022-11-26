import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function RadioButton({ data, onSelect }) {
    const [userOption, setUserOption] = useState(null);
    const selectHandler = (index) => {
        onSelect(data[index].value);
        setUserOption(index);
    };

    return (
        <View style={styles.pressable}>
            {data.map((item, index) => {
                return (
                    <Pressable
                        key={index}
                        style={
                            index === userOption ? styles.selected : styles.unselected
                        }
                        onPress={() => selectHandler(index)}>
                        <Text style={styles.option}> {item.value}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
const styles = StyleSheet.create({
    pressable: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10
    },
    option: {
        fontSize: 14,
        alignSelf: "center",
        color: "#686868",
        fontWeight: "bold",
    },
    unselected: {
        backgroundColor: "#E3E3E3",
        padding: 10,
        margin: 5,
        borderRadius: 19,
        elevation: 5,
    },
    selected: {
        backgroundColor: "#00ABB2",
        padding: 10,
        margin: 5,
        borderRadius: 19,
        elevation: 5,
    },

})