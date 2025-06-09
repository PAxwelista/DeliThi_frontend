import MapView from "react-native-maps";
import { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useDelivery } from "../../context/orderContext";
import { Order } from "../../types/order";
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import Button from "../../components/Button";
import Screen from "../../components/Screen";
import { useFetch } from "../../hooks/useFetch";
import { apiUrl } from "../../config";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MakeDeliveryStackParamList } from "../../types/navigation";
import { Delivery } from "../../types/delivery";
import Loading from "../../components/Loading";

type Props = NativeStackScreenProps<MakeDeliveryStackParamList, "Map">;

type Directioninfos = {
    duration: { text: string };
    distance: { text: string };
};

type Coords = [number, number][];

export default function MapScreen({ navigation }: Props) {
    const delivery = useDelivery();

    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [firstDirectionInfos, setFirstDirectionInfos] = useState<Directioninfos>();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [routeCoords, setRouteCoords] = useState<Coords>([]);
    const [nextRouteCoords, setnextRouteCoords] = useState<Coords>([]);
    const [refreshDirection, setRefreshDirection] = useState<boolean>(false);
    const [nextOrder, setnextOrder] = useState<Order | undefined>();
    const [loadingRefreshDirection, setLoadingRefreshDirection] = useState<boolean>(false);
    const [loadingGetPosition, setLoadingGetPosition] = useState<boolean>(false);
    const [hasLocation, setHasLocation] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setLoadingGetPosition(true);
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === "granted") {
                Location.watchPositionAsync({ distanceInterval: 10 }, location => {
                    setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
                });
                const currentLocation = await Location.getCurrentPositionAsync({});
                setLocation({ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude });
                setHasLocation(true);
            }
            setLoadingGetPosition(false);
        })();
    }, []);

    useEffect(() => {
        if (!hasLocation) return;
        (async () => {
            setLoadingRefreshDirection(true);

            try {
                const response = await fetch(`${apiUrl}/direction`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        originCoords: location,
                        waypointsCoords: delivery?.delivery?.orders.map(order => {
                            return {
                                latitude: order.customer.location.latitude,
                                longitude: order.customer.location.longitude,
                            };
                        }),
                    }),
                });
                const json = await response.json();
                setRouteCoords(json.globalPolyline);
                if (json.result) {
                    setErrorMessage("Reussi!!");
                    setnextRouteCoords(json.firstPolyline);
                    setFirstDirectionInfos(json.firstDirectionInfos);
                    setnextOrder(delivery?.delivery?.orders[json.order[0]]);
                } else setErrorMessage(json.error);
            } catch (error) {
                setErrorMessage("Erreur de connexion");
            }

            setLoadingRefreshDirection(false);
        })();
    }, [refreshDirection, hasLocation]);

    useEffect(() => {
        delivery?.delivery?.orders.every(order => order.state != "processing") && handleDeliveryFinished();
    }, [delivery]);

    const handleDeliveryFinished = async () => {
        const response = await fetch(`${apiUrl}/deliveries/state`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newState: "finished",
                deliveryID: delivery?.delivery?._id,
            }),
        });

        const data = await response.json();

        navigation.navigate("BeginDelivery");
    };

    const handleDelivery = async () => {
        await fetch(`${apiUrl}/orders/state`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newState: "delivered",
                ordersID: [nextOrder?._id],
            }),
        });

        await fetch(`${apiUrl}/orders/deliveryDate`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newDeliveryDate: new Date(),
                ordersID: [nextOrder?._id],
            }),
        });



        delivery?.setDelivery(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                orders: prev.orders.filter((order: Order) => order._id != nextOrder?._id),
            };
        });

        setRefreshDirection(t => !t);

        if (nextOrder) navigation.navigate("DeliverOrder", nextOrder);
    };

    const handlePostponeDelivery = async () => {
        await fetch(`${apiUrl}/orders/state`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newState: "pending",
                ordersID: [nextOrder?._id],
            }),
        });

        await fetch(`${apiUrl}/deliveries/${delivery?.delivery?._id}/removeOrder/${nextOrder?._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });

        delivery?.setDelivery(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                orders: prev.orders.filter((order: Order) => order._id != nextOrder?._id),
            };
        });

        setRefreshDirection(t => !t);
    };

    const handleRefreshDirection = () => {
        setRefreshDirection(t => !t);
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
    
    if (loadingGetPosition) return <Loading />;

    return (
        <Screen style={styles.container}>
            <View style={styles.header}>
                {loadingRefreshDirection ? (
                    <ActivityIndicator
                        size="large"
                        color="#3b82f6"
                    />
                ) : (
                    <>
                        <Text>Prochain client : {nextOrder?.customer.name}</Text>
                        <Text>Lieu : {nextOrder?.customer.location.name}</Text>
                        <Text>Temps : {firstDirectionInfos?.duration.text} </Text>
                        <Text>Distance : {firstDirectionInfos?.distance.text}</Text>
                        <View style={styles.buttons}>
                            <Button
                                title="Livraison"
                                onPress={handleDelivery}
                            />
                            <Button
                                title="Repousser livraison"
                                onPress={handlePostponeDelivery}
                            />
                            <Button
                                title="Rafraîchir"
                                onPress={handleRefreshDirection}
                            />
                        </View>
                    </>
                )}
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
                <Marker
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                    pinColor={"gold"}
                />
                {Markers}
                {routeCoords && (
                    <Polyline
                        coordinates={routeCoords.map(coords => {
                            return { latitude: coords[0], longitude: coords[1] };
                        })}
                        strokeColor="rgba(255,0,0,0.3)"
                        strokeWidth={3}
                    />
                )}
                {nextRouteCoords && (
                    <Polyline
                        coordinates={nextRouteCoords.map(coords => {
                            return { latitude: coords[0], longitude: coords[1] };
                        })}
                        strokeColor="rgba(255,255,0,1)"
                        strokeWidth={4}
                        style={{ zIndex: 1 }}
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
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    header: {
        flex: 1,
        margin: 20,
    },
    buttons: {
        justifyContent: "center",
        flexDirection: "row",
    },
});
