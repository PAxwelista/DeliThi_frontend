import { Text } from "react-native";
import { Loading, Screen, Button } from "../../components";
import { useFetch } from "../../hooks";
import { apiUrl } from "../../config";
import { AvailableProduct } from "../../types";

function ProductsScreen() {
    const { data, isLoading } = useFetch(`${apiUrl}/products`);
    console.log(data);

    if (isLoading) return <Loading />;

    const handlePressProduct = () => {};

    const products = data?.products.map((v: AvailableProduct) => (
        <Button
            key={v._id}
            title={`${v.name} : ${(v.price ? v.price + " euros" :  "prix non définie")}`}
            onPress={() => handlePressProduct()}
            isListMember
        />
    ));

    return (
        <Screen
            title="Produits"
            hasHeaderBar
        >
            {products}
        </Screen>
    );
}

export {ProductsScreen}
