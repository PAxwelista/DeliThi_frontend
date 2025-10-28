import { FlatList,StyleSheet } from "react-native";
import { useFetch } from "../../hooks";
import { Delivery as DeliveryType, DeliveriesStackParamList } from "../../types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { apiUrl } from "../../config";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Loading, Button, Error, Screen, Delivery } from "../../components";
import { useAppSelector } from "../../hooks/redux";

type ItemDelivery = {
    item: DeliveryType;
};

type Props = NativeStackScreenProps<DeliveriesStackParamList, "AllDeliveries">;

function DeliveriesScreen({ navigation }: Props) {
    const { data, isLoading, error, refresh } = useFetch(`${apiUrl}/deliveries`);
    const demoMode = useAppSelector(state => state.demoMode);

    useFocusEffect(
        useCallback(() => {
            refresh();
        }, [refresh])
    );

    const handlePressDeliveries = (delivery: DeliveryType) => {
        if (demoMode.value) return;
        navigation.navigate("DetailDelivery", delivery);
    };

    const renderDelivery = ({ item }: ItemDelivery) => {
        return (
            <Delivery
                onPress={() => handlePressDeliveries(item)}
                area={item.orders[0].area}
                deliveryDate={item.deliveryDate}
                nbCustomers={item.orders.length}
            />
        );
    };

    if (isLoading) return <Loading />;

    if (error) return <Error err={error} />;

    return (
        <Screen title="Livraisons" style={styles.screen}>
            <FlatList
                data={data?.deliveries?.sort((a: DeliveryType, b: DeliveryType) =>
                    b.deliveryDate.localeCompare(a.deliveryDate)
                )}
                renderItem={renderDelivery}
                keyExtractor={item => item._id}
                style={styles.list}
            />
        </Screen>
    );
}

export { DeliveriesScreen };


const styles = StyleSheet.create({
    
    screen: {
        paddingBottom: 0,
        paddingHorizontal: 0,
    },
    list:{
        padding:20
    }
});