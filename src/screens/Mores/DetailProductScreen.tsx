import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InputFormForUpdate, InputType, Screen } from "../../components";
import { MoreMenuStackParamList, Product } from "../../types";
import { useState } from "react";
import { apiUrl } from "../../config";
import { useFetchWithAuth } from "../../hooks";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "DetailProduct">;

const inputs: Record<keyof Product["product"], InputType> = {
    name: { value: "Nom", keyboardType: "default" },
    price: { value: "prix", keyboardType: "numeric" },
    capacity: { value: "capacité", keyboardType: "numeric" },
};

const DetailProductScreen = ({ route }: Props) => {
    const fetchWithAuth = useFetchWithAuth();
    const { name, price, capacity } = route.params;

    const [values, setValues] = useState<Record<"name" | "price" | "capacity", string>>({
        name,
        price: price.toString(),
        capacity: capacity?.toString() || "",
    });

    const handleValidateModifications = (newValues: Record<string, string>) => {
        newValues.price = newValues.price.replaceAll(",", ".");

        setValues(newValues);

        const urlRequest = Object.entries(newValues)
            .map(([key, value]) => key + "=" + value)
            .join("&");

        fetchWithAuth(`${apiUrl}/products/${route.params._id}?${urlRequest}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    return (
        <Screen title="Produit">
            <InputFormForUpdate
                initialValues={values}
                inputs={inputs}
                handleValidateModifications={handleValidateModifications}
            />
        </Screen>
    );
};

export { DetailProductScreen };
