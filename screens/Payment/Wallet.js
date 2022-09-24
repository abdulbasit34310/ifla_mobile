import React, {useState} from "react";
import { Text,View,StyleSheet,TouchableOpacity,Pressable } from "react-native";
import RadioButton from './RadioButton';

const Wallet = ({ navigation })=>{
    const [disable,isDisabled] = useState(false)
    const [option, setOption] = useState(null);

    const data = [
        { value: '1k' },
        { value: '10k' },
        { value: '100k' },
      ];
    
    return(
        <View style={styles.container}>
            <RadioButton data={data} onSelect={(value) => setOption(value)} />
                <TouchableOpacity style={styles.PayButtonContainer} 
                onPress={() => { navigation.navigate("Payments", { id:option })}}>
                    <Text style={styles.PayButtonText}>Pay Now</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
      PayButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      PayButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
})
export default Wallet