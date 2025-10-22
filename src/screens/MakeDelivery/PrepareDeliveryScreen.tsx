import { useFetch } from "../../hooks";
import { Screen, Button, Loading, Text } from "../../components";
import { TotalProduct, MakeDeliveryStackParamList } from "../../types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { apiUrl } from "../../config";
import { useDelivery } from "../../context/orderContext";

type Props = NativeStackScreenProps<MakeDeliveryStackParamList, "PrepareDelivery">;

function PrepareDeliveryScreen({ navigation }: Props) {
    const delivery = useDelivery();

    const _id = delivery?.delivery?._id;

    const { data, isLoading } = _id
        ? useFetch(`${apiUrl}/deliveries/${_id}/allProducts`)
        : { data: null, isLoading: false };

    const handleStartRide = () => {
        navigation.navigate("Map");
    };

    if (isLoading) return <Loading />;

    return (
        <Screen title="Préparation de commande">
            {data?.totalProduct.map((total: TotalProduct) => (
                <Text key={total.name}>
                    {total.name} x{total.quantity}
                </Text>
            ))}
            <Button
                title="Départ"
                onPress={handleStartRide}
            />
        </Screen>
    );
}

export { PrepareDeliveryScreen };
