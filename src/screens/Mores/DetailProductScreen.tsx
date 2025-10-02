import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InputFormForUpdate, Screen } from "../../components";
import { MoreMenuStackParamList, Product } from "../../types";
import { useState } from "react";
import { apiUrl } from "../../config";
import { useFetchWithAuth } from "../../hooks";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "DetailProduct">;

const inputs: Record<keyof Product["product"], string> = {
    name: "Nom",
    price: "prix",
};

const DetailProductScreen = ({ route }: Props) => {
    const fetchWithAuth = useFetchWithAuth()
    const { name, price } = route.params;

    const [values, setValues] = useState<typeof inputs>({ name, price: price.toString() });

    const handleValidateModifications = (newValues: Record<string, string>) => {

        newValues.price = newValues.price.replaceAll(",",".")

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
