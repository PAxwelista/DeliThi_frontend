import { StyleSheet, FlatList } from "react-native";
import { useFetch } from "../../hooks";
import { Order, State, OrderStackParamList } from "../../types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { apiUrl } from "../../config";
import { Loading, Error, Button, Screen } from "../../components";

type Props = NativeStackScreenProps<OrderStackParamList, "AllOrders">;

const colorState = { pending: "#D5FFC4", processing: "#C4ECFF", delivered: "#D5D5D5", cancelled: "#FFC4C4" };

function OrdersScreen({ navigation }: Props) {
    const { data, isLoading, error, refresh } = useFetch(`${apiUrl}/orders`);
    useFocusEffect(
        useCallback(() => {
            refresh();
        }, [refresh])
    );

    type ItemOrder = {
        item: Order;
    };

    const renderOrder = ({ item }: ItemOrder) => {
        const orderColorStyle = { backgroundColor: colorState[item.state as State] };

        return (
            <Button
                title={`${item.customer.name} du : ${new Date(item.creationDate).toLocaleDateString()}`}
                onPress={() => navigation.navigate("DetailOrder", item)}
                isListMember
                style={orderColorStyle}
            />
        );
    };

    if (isLoading) return <Loading />;

    if (error) return <Error err={error} />;
    if (data && !data.result) return <Error err={data.error} />;

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

export {OrdersScreen}

const styles = StyleSheet.create({
    order: {
        margin: 10,
        padding: 20,
        borderRadius: 10,
    },
});
