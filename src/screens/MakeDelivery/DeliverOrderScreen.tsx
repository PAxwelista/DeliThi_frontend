import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { MakeDeliveryStackParamList, Order } from "../../types";
import { Screen, Button } from "../../components";
import { StyleSheet } from "react-native";
import { CalculateOrderTotalPrice } from "../../utils";
import { apiUrl } from "../../config";
import { useDelivery } from "../../context/orderContext";
import { useFetchWithGroupId } from "../../hooks";

type Props = NativeStackScreenProps<MakeDeliveryStackParamList, "DeliverOrder">;

function DeliverOrderScreen({ navigation, route }: Props) {
    const fetchWithGroupId = useFetchWithGroupId();
    const order = route.params;
    const delivery = useDelivery();

    const amountToPaid = CalculateOrderTotalPrice(order);

    const handleNextOrder = async () => {
        await fetchWithGroupId(`${apiUrl}/orders/${order._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                deliveryDate: new Date(),
                state: "delivered",
                amountPaid: amountToPaid,
            }),
        });

        delivery?.setDelivery(prev => {
            if (!prev) return prev;

            return {
                ...prev,
                orders: prev.orders.filter((currentOrder: Order) => currentOrder._id != order._id),
            };
        });

        navigation.navigate("Map");
    };

    const Product = order.products.map(product => (
        <Text key={product._id}>
            {product.quantity}x {product.product.name}
        </Text>
    ));

    return (
        <Screen title="Livraison client">
            <Text>Client : {order.customer.name}</Text>
            <Text>Lieu : {order.customer.location.name}</Text>
            <View style={styles.products}>{Product}</View>
            <Text>Total : {amountToPaid} euros</Text>
            <Button
                title="Commande suivante"
                onPress={handleNextOrder}
            />
        </Screen>
    );
}

export { DeliverOrderScreen };

const styles = StyleSheet.create({
    products: {
        marginVertical: 20,
        padding: 10,
        backgroundColor: "lightgrey",
        borderRadius: 10,
    },
});
