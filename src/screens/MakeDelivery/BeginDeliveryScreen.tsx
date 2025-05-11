import { useCallback, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import Screen from "../../component/Screen";
import { Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Order } from "../../types/order";
import { MakeDeliveryStackParamList } from "../../types/navigation";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { apiUrl } from "../../config";
import { useDelivery } from "../../context/orderContext";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../../component/Loading";
import Error from "../../component/Error";

type Props = NativeStackScreenProps<MakeDeliveryStackParamList, "BeginDelivery">;

export default function BeginDeliveryScreen({ navigation }: Props) {
    const { data, isLoading, error, refresh } = useFetch(`${apiUrl}/orders/allAreas`);

    const [errorMessage, setErrorMessage] = useState<string>("");

    useFocusEffect(
        useCallback(() => {
            refresh();
        }, [refresh])
    );

    const delivery = useDelivery();

    const handleStartDelivery = async (area: string) => {
        const actualDeliveryResponse = await fetch(`${apiUrl}/deliveries/actualDelivery`);
        const actualDelivery = await actualDeliveryResponse.json();

        if (actualDelivery.result) {
            console.log("way 1");
            

            delivery?.setDelivery(actualDelivery.data);
        } else {
            console.log("way 2");
            const orderResponse = await fetch(`${apiUrl}/orders?state=pending&area=${area}`);
            const orders = await orderResponse.json();

            setErrorMessage("");

            if (!orders) {
                setErrorMessage("Problème de connexion");
                return;
            }

            if (orders.orders.length === 0) {
                setErrorMessage("Il n’y a aucune commande à traiter dans cette zone.");
                return;
            }

            const ordersID = orders.orders.map((order: Order) => order._id);

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

            const deliveriesResponse = await fetch(`${apiUrl}/deliveries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ordersID,
                }),
            });

            const deliveryData = await deliveriesResponse.json();

            await fetch(`${apiUrl}/deliveries/state`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    deliveryID: deliveryData.data._id,
                    newState: "processing",
                }),
            });

            

            const stateChange = await stateChangeResponse.json();

            
            delivery?.setDelivery(deliveryData.data);
        }

        navigation.navigate("PrepareDelivery");
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

    if (isLoading) return <Loading />;

    if (error) return <Error err={error} />;

    return (
        <Screen title="Départ livraison">
            <ScrollView>
                {Areas}
                {errorMessage && <Text>{errorMessage}</Text>}
            </ScrollView>
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
