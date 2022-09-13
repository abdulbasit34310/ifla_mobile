import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, AppRegistry, Image } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

const TrackingScreen = () => {
    const [pin, setPin] = React.useState({
        latitude: 30.375321,
        longitude: 69.345116,
    })
    return (
        <View style={styles.container}>
            {/* <GooglePlacesAutocomplete
                placeholder="Search"
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details)
                    setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    })
                }}
                query={{
                    key: "KEY",
                    language: "en",
                    components: "country:us",
                    types: "establishment",
                    radius: 30000,
                    location: `${region.latitude}, ${region.longitude}`
                }}
                styles={{
                    container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
                    listView: { backgroundColor: "white" }
                }}
            /> */}
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 30.375321,
                    longitude: 69.345116,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider='google'
            >
                <Marker
                    coordinate={{
                        latitude: 30.375321,
                        longitude: 69.345116,
                    }}
                    draggable={true}
                    onDragStart={(e) => {
                        "Drag Start", e.nativeEvent.coordinates
                    }}
                    onDragEnd={(e) => {
                        setPin({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                    }}
                >
                    <Callout><Text>There I am</Text></Callout>
                </Marker>
                <Circle center={pin} radius={1000}></Circle>
            </MapView>
        </View>
    );
};

export default TrackingScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 19,
        backgroundColor: '#066145',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});