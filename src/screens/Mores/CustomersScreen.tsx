import { FlatList } from "react-native";
import { Screen, Loading, Error, Button } from "../../components/";
import { useFetch } from "../../hooks";
import { apiUrl } from "../../config";
import { Customer, MoreMenuStackParamList } from "../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type ItemCustomer = {
    item: Customer;
};

type Props = NativeStackScreenProps<MoreMenuStackParamList, "Customers">;

export default function CustomersScreen({ navigation }: Props) {
    const { data, isLoading, error } = useFetch(`${apiUrl}/customers/`);

    const handlePressDeliveries = (customer: Customer) => {
        navigation.navigate("DetailCustomer", customer);
    };

    const renderCustomer = ({ item }: ItemCustomer) => {
        const title = item.name === item.location.name ? item.name : `${item.name} / ${item.location.name}`;
        return (
            <Button
                title={title}
                onPress={() => handlePressDeliveries(item)}
                isListMember
            />
        );
    };

    if (isLoading) return <Loading />;

    if (error) return <Error err={error} />;

    return (
        <Screen>
            <FlatList
                data={data?.customers.sort((a: Customer, b: Customer) => a.name.localeCompare(b.name))}
                renderItem={renderCustomer}
                keyExtractor={item => item._id}
            />
        </Screen>
    );
}
