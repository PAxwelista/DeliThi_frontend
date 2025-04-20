import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Screen from "../../component/Screen";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Order } from "../../types/order";
import { MakeDeliveryStackParamList } from "../../types/navigation";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { apiUrl } from "../../config";


type Props = NativeStackScreenProps<MakeDeliveryStackParamList, 'BeginDelivery'>;


export default function BeginDeliveryScreen({ navigation } : Props) {
    const { data, isLoading, error } = useFetch(`${apiUrl}/orders/allAreas`);

    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleStartDelivery = async (area: string) => {
        const orderResponse = await fetch(`${apiUrl}/orders?state=pending&area=${area}`);
        const orders = await orderResponse.json();

        if (!orders) {
            setErrorMessage("Problème de connexion");
            return;
        }

        if (orders.orders.length === 0) {
            setErrorMessage("Il n’y a aucune commande à traiter dans cette zone.");
            return;
        }

        const ordersID = orders.orders.map((order: Order) => order._id);
        const deliveriesResponse = await fetch(`${apiUrl}/deliveries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ordersID,
            }),
        });
        const delivery = await deliveriesResponse.json();

        const stateChangeResponse = await fetch(`${apiUrl}/orders/state`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ordersID,
                newState: "processing",
            }),
        });
        const stateChange = await stateChangeResponse.json();
        navigation.navigate("PrepareDelivery", delivery.data);
    };

    const Areas = data?.areas.map((area: string) => (
        <TouchableOpacity
            key={area}
            style={styles.area}
            onPress={() => handleStartDelivery(area)}
        >
            <Text>{area}</Text>
        </TouchableOpacity>
    ));

    return (
        <Screen title="Départ livraison">
            {Areas}
            {errorMessage && <Text>{errorMessage}</Text>}
        </Screen>
    );
}

const styles = StyleSheet.create({
    area: {
        padding: 20,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "lightgrey",
    },
});
