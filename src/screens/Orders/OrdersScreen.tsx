import { StyleSheet, FlatList } from "react-native";
import { useFetch } from "../../hooks";
import { Order as OrderType, OrderStackParamList } from "../../types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { apiUrl } from "../../config";
import { Loading, Error, Button, Screen, Order } from "../../components";
import { CalculateOrderTotalPrice } from "../../utils";

type Props = NativeStackScreenProps<OrderStackParamList, "AllOrders">;

function OrdersScreen({ navigation }: Props) {
    const { data, isLoading, error, refresh } = useFetch(`${apiUrl}/orders`);
    useFocusEffect(
        useCallback(() => {
            refresh();
        }, [refresh])
    );

    type ItemOrder = {
        item: OrderType;
    };

    const renderOrder = ({ item }: ItemOrder) => {
        return (
            <Order
                status={item.state}
                customerName={item.customer.name}
                price={item.amountPaid || CalculateOrderTotalPrice(item)}
                onPress={() => navigation.navigate("DetailOrder", item)}
            />
        );
    };

    if (isLoading) return <Loading />;

    if (error) return <Error err={error} />;
    if (data && !data.result) return <Error err={data.error} />;

    return (
        <Screen title="Commandes">
            <FlatList
                data={data?.orders.sort((a: OrderType, b: OrderType) => b.creationDate.localeCompare(a.creationDate))}
                renderItem={renderOrder}
                keyExtractor={item => item._id}
            />
        </Screen>
    );
}

export { OrdersScreen };

const styles = StyleSheet.create({
    order: {
        margin: 10,
        padding: 20,
        borderRadius: 10,
    },
});
