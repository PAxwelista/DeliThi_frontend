import { Text, View, StyleSheet, Alert } from "react-native";
import { Screen, Button, Input } from "../../components";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OrderStackParamList, State } from "../../types";
import { useState } from "react";
import { apiUrl } from "../../config";
import { CalculateOrderTotalPrice } from "../../utils";
import { useFetchWithAuth } from "../../hooks";


const frenchState = {
    pending: "Enregistré",
    processing: "En cours de livraison",
    delivered: "Livré",
    cancelled: "Annulé",
};

type Props = NativeStackScreenProps<OrderStackParamList, "DetailOrder">;

function DetailOrderScreen({ route }: Props) {
    const fetchWithAuth= useFetchWithAuth();
    const { _id, customer, deliveryDate, creationDate, products, area , amountPaid } = route.params;

    const [state, setState] = useState(route.params.state);
    const [actualArea, setActualArea] = useState(area);

    const title = `Commande pour ${customer.name}`;

    const Product = products.map((v: { _id: string; product: { name: string }; quantity: number }) => (
        <Text key={v._id}>
            {v.product?.name} : x{v.quantity}
        </Text>
    ));

    const handleChangeArea = async () => {
        const response = await fetchWithAuth(`${apiUrl}/orders/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ area: actualArea }),
        });
    };

    const showAlert = () => {
        Alert.alert("Attention", "Voulez vous vraiment supprimer cette commande?", [
            { text: "Non", style: "cancel" },
            { text: "Oui", onPress: handleCancelledOrder },
        ]);
    };

    const handleCancelledOrder = async () => {
        const response = await fetchWithAuth(`${apiUrl}/orders/state`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ordersID: [_id], newState: "cancelled" }),
        });

        const json = await response.json();

        if (json.result) setState("cancelled");
    };

    return (
        <Screen title={title}>
            <Text>Commande du {new Date(creationDate).toLocaleDateString()}</Text>
            <View style={styles.area}>
                <Text>Zone : </Text>
                <Input
                    value={actualArea}
                    onChangeText={v => setActualArea(v)}
                    style={styles.areaInput}
                    onEndEditing={handleChangeArea}
                />
            </View>
            <View style={styles.products}>{Product}</View>
            <Text>Statut : {frenchState[state as State]}</Text>
            <Text>{amountPaid ? `Total payé : ${amountPaid}` : `Total : ${CalculateOrderTotalPrice(route.params)}`} euros</Text>
            {deliveryDate && <Text>Commande livré le : {new Date(deliveryDate).toLocaleDateString()}</Text>}
            {state != "cancelled" && state != "delivered" && (
                <Button
                    title="Annuler commande"
                    onPress={showAlert}
                />
            )}
        </Screen>
    );
}

export { DetailOrderScreen };

const styles = StyleSheet.create({
    products: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        marginVertical: 20,
        backgroundColor: "#E7E7E7",
        alignItems: "center",
    },
    area: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 20,
    },
    areaInput: {
        minWidth: "70%",
    },
});
