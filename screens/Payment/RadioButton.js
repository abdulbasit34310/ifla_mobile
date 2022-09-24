import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function RadioButton({ data, onSelect }) {
  const [userOption, setUserOption] = useState(null);
  const selectHandler = (value) => {
    onSelect(value);
    setUserOption(value);
  };

  return (
    <View style={styles.ButtonContainer}>
      {data.map((item,index) => {
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
  ButtonContainer: {
    display:"flex",
    flexDirection:"row"
  },
  option: {
    fontSize: 16,
    alignSelf: "center",
    color: "#005761",
    fontWeight: "bold",
  },
  unselected: {
    backgroundColor: "#E0EFF6",
    padding: 30,
    width: "30%",
    margin: 10,
    borderRadius: 20,
    elevation: 50,
    },
  selected: {
    backgroundColor: "grey",
    padding: 30,
    width: "30%",
    margin: 5,
    borderRadius: 20,
    elevation: 50,
  },
})