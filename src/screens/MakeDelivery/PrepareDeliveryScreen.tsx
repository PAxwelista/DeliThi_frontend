import { useFetch } from "../../hooks/useFetch";
import Screen from "../../components/Screen";
import { Text } from "react-native";
import { TotalProduct } from "../../types/totalProduct";
import Button from "../../components/Button";
import { MakeDeliveryStackParamList } from "../../types/navigation";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { apiUrl } from "../../config";
import { useDelivery } from "../../context/orderContext";

type Props = NativeStackScreenProps<MakeDeliveryStackParamList, 'PrepareDelivery'>;

export default function PrepareDeliveryScreen({navigation } : Props) {
    
    const delivery = useDelivery()

    const _id = delivery?.delivery?._id

    const { data } = useFetch(`${apiUrl}/deliveries/${_id}/allProducts`);

    const handleStartRide = ()=>{

        

        navigation.navigate("Map")
    }

    return (
        <Screen title="Préparation de commande">
            {data?.totalProduct.map((total: TotalProduct) => (
                <Text key={total.name}>{total.name} x{total.quantity}</Text>
            ))}
            <Button title="Départ" onPress={handleStartRide}/>
        </Screen>
    );
}
