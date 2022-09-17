import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, AppRegistry, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_MAP_KEY } from '../../components/GoogleMapKey';
import MapViewDirections from 'react-native-maps-directions';
import imagePath from '../../components/imagePath';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.9222;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const TrackingScreen = () => {
    const [state, setState] = React.useState({
        curLoc: {
            latitude: 31.634664128,
            longitude: 74.351998592,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        },
        destinationCords: {
            latitude: 29.39779,
            longitude: 71.6752,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        },
        distance: 0,
    })

    const fetchTime = (d) => {
        updateState({
            distance: d,
        })
    }

    const { curLoc, distance, destinationCords } = state
    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const mapRef = useRef < MapView > (null);

    return (
        <View style={styles.container}>
            <MapView style={StyleSheet.absoluteFill}
                initialRegion={curLoc}>
                <MapViewDirections
                    origin={curLoc}
                    destination={destinationCords}
                    apikey={GOOGLE_MAP_KEY}
                    strokeWidth={3}
                    optimizeWaypoints={true}
                    onReady={
                        args => {
                            console.log(`Distance: ${args.distance} km`);
                            fetchTime(args.distance),
                                mapRef.current?.fitToCoordinates(args.coordinates, {
                                    edgePadding: {
                                        top: 70,
                                        right: 70,
                                        bottom: 70,
                                        left: 70,
                                    },
                                });
                        }}
                />
                <Marker coordinate={curLoc}
                    image={imagePath.isCurLoc} />
                <Marker coordinate={destinationCords} />
            </MapView>
            {distance !== 0 && (<View style={{ alignItems: 'center', marginVertical: 16 }}>
                <Text>Distance left: {distance.toFixed(0)} km</Text>
            </View>)
            }
        </View>
    );
};

export default TrackingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 19,
        backgroundColor: '#066145',
    },
});