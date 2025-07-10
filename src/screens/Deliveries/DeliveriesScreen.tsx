import { FlatList } from "react-native";
import { useFetch } from "../../hooks";
import { Delivery, DeliveriesStackParamList } from "../../types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { apiUrl } from "../../config";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Loading, Button, Error, Screen } from "../../components";

type ItemDelivery = {
    item: Delivery;
};

type Props = NativeStackScreenProps<DeliveriesStackParamList, "AllDeliveries">;

  function DeliveriesScreen({ navigation }: Props) {
    const { data, isLoading, error, refresh } = useFetch(`${apiUrl}/deliveries`);

    useFocusEffect(
        useCallback(() => {
            refresh();
        }, [refresh])
    );

    const handlePressDeliveries = (delivery: Delivery) => {
        navigation.navigate("DetailDelivery", delivery);
    };

    const renderDelivery = ({ item }: ItemDelivery) => {
        return (
            <Button
                isListMember={true}
                title={`Livraison du ${new Date(item.deliveryDate).toLocaleDateString()} / zone : ${
                    item.orders[0]?.area
                }`}
                onPress={() => handlePressDeliveries(item)}
            />
        );
    };

    if (isLoading) return <Loading />;

    if (error) return <Error err={error} />;

    return (
        <Screen title="Livraisons">
            <FlatList
                data={data?.deliveries.sort((a: Delivery, b: Delivery) => b.deliveryDate.localeCompare(a.deliveryDate))}
                renderItem={renderDelivery}
                keyExtractor={item => item._id}
            />
        </Screen>
    );
}

export {DeliveriesScreen}
