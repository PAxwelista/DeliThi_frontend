import { Screen } from "../../components";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Order, Product, TotalProduct } from "../../types";
import { useFetch } from "../../hooks/useFetch";
import { DeliveriesStackParamList } from "../../types/navigation";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { apiUrl } from "../../config";
import { CalculateOrderTotalPrice } from "../../utils";

type ItemOrder = {
    item: Order;
};

type Props = NativeStackScreenProps<DeliveriesStackParamList, "DetailDelivery">;

function DetailDeliveryScreen({ route }: Props) {
    const { _id, deliveryDate, orders } = route.params;

    const { data: total } = useFetch(`${apiUrl}/deliveries/${_id}/allProducts`);

    const renderOrders = ({ item }: ItemOrder) => {
        return (
            <View style={styles.order}>
                <Text style={styles.orderCustomer}>{item.customer.name}</Text>
                <View>
                    {item.products.map((product: Product) => (
                        <Text key={product._id}>
                            {product.product.name} x{product.quantity}
                        </Text>
                    ))}
                </View>
            </View>
        );
    };

    return (
        <Screen title="Livraison">
            <Text style={styles.deliveryDate}>Date de livraison : {new Date(deliveryDate).toLocaleDateString()}</Text>
            <View style={styles.orders}>
                <FlatList
                    data={orders}
                    renderItem={renderOrders}
                    keyExtractor={item => item._id}
                />
            </View>
            <View style={styles.total}>
                <Text style={styles.totalText}>Total : </Text>
                <View style={styles.totalElmtsAndPrice}>
                    <View style={styles.totalElmts}>
                        {total?.totalProduct.map((product: TotalProduct) => (
                            <Text key={product.name}>
                                {product.name} x{product.quantity}
                            </Text>
                        ))}
                    </View>
                    <Text style={styles.totalPrice}>
                        {orders.reduce((a, v) => (a + v.amountPaid ? v.amountPaid : CalculateOrderTotalPrice(v)), 0)}{" "}
                        euros
                    </Text>
                </View>
            </View>
        </Screen>
    );
}

export { DetailDeliveryScreen };

const styles = StyleSheet.create({
    order: {
        backgroundColor: "lightgrey",
        borderRadius: 10,
        margin: 5,
        padding: 10,
    },
    orderCustomer: {
        textAlign: "center",
    },
    deliveryDate: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
    },
    total: {
        flex: 3,
        justifyContent: "center",
    },
    orders: {
        flex: 6,
    },
    totalText: {
        textAlign: "center",
    },
    totalElmtsAndPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    totalElmts: {
        flexDirection: "column",
    },
    totalPrice: {
        textAlignVertical: "center",
    },
});
