import { View, Dimensions, StyleSheet } from "react-native";
import { useFetch } from "../../hooks";
import { apiUrl } from "../../config";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Loading, Error, Screen, CustomModal } from "../../components";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Customer, MoreMenuStackParamList } from "../../types";
import { transformWordToColor } from "../../utils";
import { CustomerInfosMap } from "./Components/CustomerInfosMap";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Coord = { latitude: number; longitude: number };

type Props = NativeStackScreenProps<MoreMenuStackParamList, "CustomersMap">;

const CustomersMapScreen = ({ navigation }: Props) => {
    const { data, isLoading, error, refresh } = useFetch(`${apiUrl}/customers/`);

    const [location, setLocation] = useState<Coord>({ latitude: -1, longitude: -1 });
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [modalInfos, setModalInfos] = useState<Customer | undefined>();

    useFocusEffect(
        useCallback(() => {
            refresh();
        }, [refresh])
    );

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status === "granted") {
                Location.watchPositionAsync({ distanceInterval: 10 }, location => {
                    setLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
                });
                const currentLocation = await Location.getCurrentPositionAsync({});
                setLocation({ latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude });
            }
        })();
    }, []);

    const handleClickOnMarker = (customer: Customer) => {
        setModalInfos(customer);
        setIsModalVisible(true);
    };

    const markers = data?.customers?.map(
        (customer: Customer) =>
            customer.location.latitude &&
            customer.location.longitude && (
                <Marker
                    key={customer._id}
                    coordinate={{ latitude: customer.location.latitude, longitude: customer.location.longitude }}
                    pinColor={transformWordToColor(customer.location.area.toLowerCase())}
                    onPress={() => handleClickOnMarker(customer)}
                />
            )
    );

    if (isLoading) return <Loading />;
    if (error) return <Error err={error} />;

    return (
        <Screen
            style={styles.container}
            title="Carte clients"
            hasHeaderBar
        >
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
                {markers}
            </MapView>

            <CustomerInfosMap
                visible={isModalVisible}
                setIsVisible={val => setIsModalVisible(val)}
                customer={modalInfos}
                navigate={navigation.navigate}
            />
        </Screen>
    );
};

export { CustomersMapScreen };

const styles = StyleSheet.create({
    map: {
        flex: 5,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    container: {
        paddingHorizontal: 0,
        paddingBottom: 0,
    },
});
