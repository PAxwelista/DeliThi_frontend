import { FlatList } from "react-native";
import { Screen, Loading, Error, Button } from "../../components/";
import { useFetch } from "../../hooks";
import { apiUrl } from "../../config";
import type { Customer, MoreMenuStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

type ItemCustomer = {
    item: Customer;
};

type Props = NativeStackScreenProps<MoreMenuStackParamList, "Customers">;

function CustomersScreen({ navigation }: Props) {
    const { data, isLoading, error, refresh } = useFetch(`${apiUrl}/customers/`);

    useFocusEffect(
        useCallback(() => {
            refresh();
        }, [refresh])
    );

    const handlePressDeliveries = (customer: Customer) => {
        navigation.navigate("DetailCustomer", customer);
    };

    const renderCustomer = ({ item }: ItemCustomer) => {
        const title = item.name === item.location.name ? item.name : `${item.name} / ${item.location.name}`;
        const hasLatAndLong = item.location.latitude && item.location.longitude;
        const style = !hasLatAndLong ? { backgroundColor: "red" } : {};

        return (
            <Button
                title={title}
                onPress={() => handlePressDeliveries(item)}
                isListMember
                style={style}
            />
        );
    };

    if (isLoading) return <Loading />;

    if (error) return <Error err={error} />;

    return (
        <Screen
            title="Clients"
            hasHeaderBar
        >
            <FlatList
                data={data?.customers?.sort((a: Customer, b: Customer) => a.name.localeCompare(b.name))}
                renderItem={renderCustomer}
                keyExtractor={item => item._id}
            />
        </Screen>
    );
}

export { CustomersScreen };
