import { Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Screen from "../../components/Screen";
import { useFetch } from "../../hooks/useFetch";
import { Order } from "../../types/order";
import { State } from "../../types/state";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { OrderStackParamList } from "../../types/navigation";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import React from "react";
import { apiUrl } from "../../config";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

type Props = NativeStackScreenProps<OrderStackParamList, "AllOrders">;

const colorState = { pending: "#D5FFC4", processing: "#C4ECFF", delivered: "#D5D5D5", cancelled: "#FFC4C4" };

export default function OrdersScreen({ navigation }: Props) {
    const { data, isLoading, error, refresh } = useFetch(`${apiUrl}/orders`);

    useFocusEffect(
        useCallback(() => {
            refresh();
        }, [refresh])
    );

    type ItemOrder = {
        item: Order;
    };

    const handleOnCancel = () => {
        refresh();
    };

    const renderOrder = ({ item }: ItemOrder) => {
        const orderColorStyle = { backgroundColor: colorState[item.state as State] };

        return (
            <TouchableOpacity
                style={[styles.order, orderColorStyle]}
                onPress={() => navigation.navigate("DetailOrder", item)}
            >
                <Text>
                    {item.customer.name} du : {new Date(item.creationDate).toLocaleDateString()}
                </Text>
            </TouchableOpacity>
        );
    };

    if (isLoading) return <Loading />;

    if (error) return <Error err={error} />;

    return (
        <Screen title="Commandes">
            <FlatList
                data={data?.orders.sort((a: Order, b: Order) => b.creationDate.localeCompare(a.creationDate))}
                renderItem={renderOrder}
                keyExtractor={item => item._id}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    order: {
        margin: 10,
        padding: 20,
        borderRadius: 10,
    },
});
