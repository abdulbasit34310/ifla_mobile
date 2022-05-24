import * as React from 'react';
import { View, StyleSheet, Image, Alert} from 'react-native';
import Constants from 'expo-constants';
import IFLA from './images/IFLA.png';

const MainScreen = ({route,navigation}) => {
    // //const [token,setToken] = React.useState(route.params.token)
    // async function getValueFor(key) {
    //     let result = await SecureStore.getItemAsync(key);
    //     if (result) {
    //         setToken(result)
    //     //   Alert.alert("🔐 Here's your value 🔐 \n" + result);
    //     } else {
    //     //   Alert.alert('No Token.');
    //         navigation.navigate("RegisteringScreen")
    //     }
    //   }

    // React.useEffect(()=>{
    //     navigation.addListener('focus', () => {
    //         getValueFor('token')
    //       });
    // },[navigation])
    return (
        <View style={styles.container}>
            <Image
                style={{
                    backgroundColor: "#00ABB2",
                    width: 335,
                    height: 275,
                }}
                source={IFLA}
            />
        </View>
    )
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#00ABB2',
        alignItems: 'center',
    },
});