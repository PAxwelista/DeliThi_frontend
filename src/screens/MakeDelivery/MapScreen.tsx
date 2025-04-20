import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default function MapScreen() {
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === "granted") {
                const location = await Location.getCurrentPositionAsync({});
                setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            }
        })();
    }, []);

    //const Markers = 

    return (
        <MapView
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            style={{ flex: 1 }}
        >
            <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        </MapView>
    );
}
