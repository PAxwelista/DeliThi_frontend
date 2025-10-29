import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ReactNode, useRef } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import MapView, { LatLng, PROVIDER_DEFAULT } from "react-native-maps";

type Props = { children: ReactNode; style: ViewStyle; location: LatLng };

const Map = ({ children, style, location }: Props) => {
    const mapRef = useRef<MapView>(null);

    const handleFocusUserLocation = () => {
        mapRef.current?.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
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
                style={style}
                provider={PROVIDER_DEFAULT}
            >
                {children}
            </MapView>
            <TouchableOpacity
                style={styles.currentLocationBtn}
                onPress={handleFocusUserLocation}
            >
                <FontAwesomeIcon
                    icon={faLocationCrosshairs}
                    size={30}
                    color="white"
                />
            </TouchableOpacity>
        </View>
    );
};

export { Map };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    currentLocationBtn: {
        position: "absolute",
        height: 50,
        width: 50,
        bottom: 20,
        right: 20,
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 2,
    },
});
