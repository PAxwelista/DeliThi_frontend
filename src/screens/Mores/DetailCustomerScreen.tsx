import { Screen, InputFormForUpdate, InputType } from "../../components/";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MoreMenuStackParamList, CustomerForm } from "../../types";
import { useFetchWithAuth } from "../../hooks";
import { apiUrl } from "../../config";
import { useState } from "react";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "DetailCustomer">;

const inputs: Record<keyof CustomerForm, InputType> = {
    name: { value: "Nom", keyboardType: "default" },
    locationName: { value: "Lieu", keyboardType: "default" },
    area: { value: "Zone", keyboardType: "default" },
    email: { value: "Mail", keyboardType: "default" },
    phoneNumber: { value: "Numéro de téléphone", keyboardType: "default" },
};

function DetailCustomerScreen({ route }: Props) {
    const fetchWithAuth = useFetchWithAuth();
    const { name, email, phoneNumber } = route.params;
    const { name: locationName, area } = route.params.location;
    const [values, setValues] = useState<Record<keyof typeof inputs, string>>({
        name,
        locationName,
        area,
        phoneNumber,
        email,
    });

    const handleValidateModifications = (newValues: Record<string, string>) => {
        setValues(newValues);
        const urlRequest = Object.entries(newValues)
            .map(([key, value]) => key + "=" + value)
            .join("&");

        fetchWithAuth(`${apiUrl}/Customers/${route.params._id}?${urlRequest}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    return (
        <Screen
            title="Client"
            hasHeaderBar
        >
            <InputFormForUpdate
                initialValues={values}
                inputs={inputs}
                handleValidateModifications={handleValidateModifications}
            />
        </Screen>
    );
}

export { DetailCustomerScreen };
