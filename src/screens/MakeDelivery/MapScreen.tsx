import MapView from "react-native-maps";
import { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
//import MapViewDirections from "react-native-maps-directions";
import { useEffect, useState } from "react";
import { useDelivery } from "../../context/orderContext";
import { Order } from "../../types/order";
import { View, Text, StyleSheet } from "react-native";
import Button from "../../component/Button";
import Screen from "../../component/Screen";
import { useFetch } from "../../hooks/useFetch";
import { apiUrl } from "../../config";

export default function MapScreen() {
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [directionInfos, setDirectionInfos] = useState();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const delivery = useDelivery();
    const [routeCoords, setRouteCoords] = useState([]);

    const [test, setTest] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === "granted") {
                const location = await Location.getCurrentPositionAsync({});
                setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
                try {
                    const response = await fetch(`${apiUrl}/direction`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            originCoords: { latitude: location.coords.latitude, longitude: location.coords.longitude },
                            waypointsCoords: [
                                {
                                    latitude: delivery?.delivery?.orders[0].customer.location.latitude,
                                    longitude: delivery?.delivery?.orders[0].customer.location.longitude,
                                },
                            ],
                        }),
                    });
                    const json = await response.json();
                    setRouteCoords(json.polyline);
                    if (json.result) {
                        setErrorMessage("Reussi!!");
                    } else setErrorMessage(json.error);
                } catch (error) {
                    setErrorMessage("Erreur de connexion");
                }
            
            }
            
        })();
    }, [test]);

    const handleOnArrived = () => {
        setTest(t => !t);
    };

    const Markers = delivery?.delivery?.orders.map((order: Order) => {
        return (
            <Marker
                key={order._id}
                coordinate={{
                    latitude: order.customer.location.latitude,
                    longitude: order.customer.location.longitude,
                }}
                onPress={() => console.log("tetst")}
            />
        );
    });

    return (
        <Screen style={styles.container}>
            <View style={styles.header}>
                <Text>Prochaine destination : </Text>
                <Button
                    title="Arrivé"
                    onPress={handleOnArrived}
                />
            </View>
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
                style={styles.map}
            >
                <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
                {Markers}
                {routeCoords && (
                    <Polyline
                        coordinates={routeCoords.map(coords => {
                            return { latitude: coords[0], longitude: coords[1] };
                        })}
                        strokeColor="red"
                        strokeWidth={4}
                    />
                )}
            </MapView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
    },
    map: {
        flex: 5,
    },
    header: {
        flex: 1,
    },
});
