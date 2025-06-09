import Screen from "../../components/Screen";
import { Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useFetch } from "../../hooks/useFetch";
import { Delivery } from "../../types/delivery";
import { DeliveriesStackParamList } from "../../types/navigation";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { apiUrl } from "../../config";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

type ItemDelivery = {
    item: Delivery;
};

type Props = NativeStackScreenProps<DeliveriesStackParamList, "AllDeliveries">;

export default function DeliveriesScreen({ navigation }: Props) {
    const { data, isLoading, error, refresh } = useFetch(`${apiUrl}/deliveries`);

    useFocusEffect(
        useCallback(() => {
            refresh();
        }, [refresh])
    );

    const handlePressDeliveries = (delivery: Delivery) => {
        navigation.navigate("DetailDelivery", delivery);
    };

    const renderDelivery = ({ item }: ItemDelivery) => {
        return (
            <TouchableOpacity
                style={styles.delivery}
                onPress={() => handlePressDeliveries(item)}
            >
                <Text>Livraison du {new Date(item.deliveryDate).toLocaleDateString()} / zone : {item.orders[0]?.area}</Text>
            </TouchableOpacity>
        );
    };

    const Deliveries = data?.deliveries.map((delivery: Delivery) => (
        <TouchableOpacity
            key={delivery._id}
            style={styles.delivery}
            onPress={() => handlePressDeliveries(delivery)}
        >
            <Text>Livraison du {new Date(delivery.deliveryDate).toLocaleDateString()}</Text>
        </TouchableOpacity>
    ));

    if (isLoading) return <Loading/>

    if (error)
        return <Error err={error} />

    return (
        <Screen title="Livraisons">
            <FlatList
                data={data?.deliveries.sort((a: Delivery, b: Delivery) => b.deliveryDate.localeCompare(a.deliveryDate))}
                renderItem={renderDelivery}
                keyExtractor={item => item._id}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    delivery: {
        margin: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "lightblue",
    },
});
