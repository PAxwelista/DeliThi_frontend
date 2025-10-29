import { View, StyleSheet, Alert, GestureResponderEvent } from "react-native";
import { Screen, Button, Input, Text, colorState } from "../../components";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OrderStackParamList, State } from "../../types";
import { useState } from "react";
import { apiUrl } from "../../config";
import { CalculateOrderTotalPrice } from "../../utils";
import { useFetchWithAuth, useInput } from "../../hooks";
import frenchState from "../../../assets/translation/frenchState.json";

type Props = NativeStackScreenProps<OrderStackParamList, "DetailOrder">;

function DetailOrderScreen({ route }: Props) {
    const fetchWithAuth = useFetchWithAuth();
    const { _id, customer, deliveryDate, creationDate, products, amountPaid } = route.params;

    const [state, setState] = useState(route.params.state);
    const [area, setArea] = useState(route.params.area);
    const areaInput = useInput(area);

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
            body: JSON.stringify({ area: areaInput.value }),
        });
        const data = await response.json();

        if (data.result) {
            setArea(areaInput.value);
        }
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

    const statusStyle = { backgroundColor: colorState[state] };

    const disableBtn = area === areaInput.value;
    console.log(areaInput.value, area);

    return (
        <Screen
            title={title}
            hasHeaderBar
        >
            <View style={styles.order}>
                <View style={styles.statusView}>
                    <Text style={[styles.status, statusStyle]}>{frenchState[state as State]}</Text>
                    <Text style={styles.price}>
                        {amountPaid
                            ? `Payé : ${amountPaid.toFixed(2)}€`
                            : `${CalculateOrderTotalPrice(route.params).toFixed(2)}€`}
                    </Text>
                </View>
                <Text>{new Date(creationDate).toLocaleDateString()}</Text>
                <View style={styles.area}>
                    <Input
                        {...areaInput}
                        style={styles.areaInput}
                    />
                    <Button
                        title="Changer"
                        onPress={handleChangeArea}
                        style={styles.areaBtn}
                        disable={disableBtn}
                    />
                </View>
                <View style={styles.products}>{Product}</View>

                {deliveryDate && <Text>Commande livré le : {new Date(deliveryDate).toLocaleDateString()}</Text>}
                {state != "cancelled" && state != "delivered" && (
                    <Button
                        title="Annuler commande"
                        onPress={showAlert}
                    />
                )}
            </View>
        </Screen>
    );
}

export { DetailOrderScreen };

const styles = StyleSheet.create({
    order: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
    },
    statusView: {
        alignItems: "flex-start",
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    status: {
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
    },
    products: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "#E7E7E7",
        alignItems: "center",
    },
    area: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    areaInput: {
        flex: 2,
    },
    areaBtn: {
        flex: 1,
    },
    price: {
        marginVertical: 10,
    },
});
