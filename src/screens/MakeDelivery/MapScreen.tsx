import { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useDelivery } from "../../context/orderContext";
import { Order, MakeDeliveryStackParamList } from "../../types";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import { Button, Screen, Loading, Error as ErrorComp, Text, Map } from "../../components";
import { apiUrl } from "../../config";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TransformSecondToTime } from "../../utils";
import { useFetchWithAuth } from "../../hooks";

type Props = NativeStackScreenProps<MakeDeliveryStackParamList, "Map">;

type Directioninfos = {
    duration: number;
    distance: number;
};

type Coord = { latitude: number; longitude: number };

type Coords = [number, number][];

const initialCoords = { latitude: -1, longitude: -1 };

function MapScreen({ navigation }: Props) {
    const fetchWithAuth = useFetchWithAuth();
    const delivery = useDelivery();

    const [location, setLocation] = useState<Coord>(initialCoords);
    const [firstDirectionInfos, setFirstDirectionInfos] = useState<Directioninfos>();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [routeCoords, setRouteCoords] = useState<Coords>([]);
    const [refreshDirection, setRefreshDirection] = useState<boolean>(false);
    const [loadingRefreshDirection, setLoadingRefreshDirection] = useState<boolean>(false);
    const [loadingGetPosition, setLoadingGetPosition] = useState<boolean>(false);

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
                await itiliazeRouteOrder({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                });
            }

            setLoadingGetPosition(false);
        })();
    }, []);

    useEffect(() => {
        if (location.latitude === -1) return;
        initializeRouteCoords(
            delivery?.delivery?.orders.map(order => ({
                latitude: order.customer.location.latitude,
                longitude: order.customer.location.longitude,
            })),
            location
        );
    }, [refreshDirection]);

    useEffect(() => {
        if (delivery?.delivery?.orders.every(order => order.state != "processing") || !delivery?.delivery)
            handleDeliveryFinished();
    }, [delivery]);

    const removeFirstOrder = () => {
        delivery?.setDelivery(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                orders: prev.orders.filter((order: Order) => order._id != delivery?.delivery?.orders[0]?._id),
            };
        });
    };

    const handleDeliveryFinished = async () => {
        if (!delivery?.delivery?._id) return;

        const response = await fetchWithAuth(`${apiUrl}/deliveries/state`, {
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

    async function itiliazeRouteOrder(location: Coord) {
        try {
            const response = await fetchWithAuth(`${apiUrl}/direction/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    waypointsCoords: [
                        location,
                        ...(delivery?.delivery?.orders.map(order => {
                            return {
                                latitude: order.customer.location.latitude,
                                longitude: order.customer.location.longitude,
                            };
                        }) ?? []),
                    ],
                }),
            });
            const json = await response.json();
            if (json.result) {
                delivery?.setDelivery(prev => {
                    if (!prev) return null;
                    return {
                        ...prev,
                        orders: json.order.filter((v: number) => v > 0).map((index: number) => prev.orders[index - 1]),
                    };
                });
                await initializeRouteCoords(json.orderCoords);
            } else setErrorMessage(json.error);
        } catch (error) {
            setErrorMessage("Erreur de connexion");
        }
    }

    async function initializeRouteCoords(coords: Coord[] | undefined, location?: Coord) {
        setLoadingRefreshDirection(true);

        try {
            const waypointsCoords = location ? [location, ...(coords ?? [])] : coords ?? [];
            const response = await fetchWithAuth(`${apiUrl}/direction`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    waypointsCoords,
                }),
            });
            const json = await response.json();

            if (json.result) {
                setRouteCoords(json.globalPolyline);
                setFirstDirectionInfos(json.directionInfos[0]);
            } else setErrorMessage(json.error);
        } catch (error) {
            setErrorMessage("Erreur de connexion");
        }

        setLoadingRefreshDirection(false);
    }

    const handleDelivery = async () => {
        removeFirstOrder();

        handleRefreshDirection();

        if (delivery?.delivery?.orders[0]) navigation.navigate("DeliverOrder", delivery?.delivery?.orders[0]);
    };

    const handlePostponeDelivery = async () => {

        if (!delivery?.delivery?.orders[0]?._id) return

        const ordersID = [delivery?.delivery?.orders[0]?._id];

        if (!removeOrdersFromDelivery(ordersID)) return;

        removeFirstOrder();

        handleRefreshDirection();
    };

    const handlePostponeAllDelivery = async () => {
        const ordersID = delivery?.delivery?.orders.map(v => v._id);

        console.log(ordersID)
        if (!ordersID) return;

        if (!removeOrdersFromDelivery(ordersID)) return;

        delivery?.setDelivery(null);

        handleRefreshDirection();
    };

    const handleRefreshDirection = () => {
        setRefreshDirection(t => !t);
    };

    const removeOrdersFromDelivery = async (ordersID: string[]) => {
        try {
            const responseDelivery = await fetchWithAuth(
                `${apiUrl}/deliveries/${delivery?.delivery?._id}/removeOrders`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ordersID,
                    }),
                }
            );

            const dataDelivery = await responseDelivery.json();

            return dataDelivery;
        } catch (error) {}

        return null;
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
    if (errorMessage) return <ErrorComp err={errorMessage} />;
    try {
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
                            <Text>Prochain client : {delivery?.delivery?.orders[0]?.customer.name}</Text>
                            <Text>Lieu : {delivery?.delivery?.orders[0]?.customer.location.name}</Text>
                            <Text>
                                Temps initiale :{" "}
                                {firstDirectionInfos?.duration
                                    ? TransformSecondToTime(firstDirectionInfos.duration)
                                    : "Pas définie"}
                            </Text>
                            <Text>
                                Distance intiale :{" "}
                                {firstDirectionInfos?.distance
                                    ? Math.floor(firstDirectionInfos.distance / 1000) + " km"
                                    : "Pas définie"}{" "}
                            </Text>
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
                                    title="Repousser toute la livraison"
                                    onPress={handlePostponeAllDelivery}
                                />
                                <Button
                                    title="Rafraîchir"
                                    onPress={handleRefreshDirection}
                                />
                            </View>
                        </>
                    )}
                </View>
                <Map
                    style={styles.map}
                    location={location}
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
                </Map>
            </Screen>
        );
    } catch (err) {
        let errorMess = "";
        if (err instanceof Error) {
            errorMess = "Erreur : " + err.message;
        } else {
            errorMess = "Erreur inconnue : " + err;
        }
        return <ErrorComp err={errorMess} />;
    }
}

export { MapScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingBottom: 0,
    },
    map: {
        flex: 4,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    header: {
        flex: 1,
        margin: 20,
    },
    buttons: {
        flex: 1,
        flexWrap: "wrap",
        justifyContent: "center",
        flexDirection: "row",
        zIndex: 10,
    },
    currentLocationBtn: {
        position: "absolute",
        height: 70,
        width: 70,
        bottom: 20,
        right: 20,
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 2,
    },
});
