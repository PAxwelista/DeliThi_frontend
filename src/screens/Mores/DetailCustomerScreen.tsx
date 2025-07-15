import { Screen, InputFormForUpdate } from "../../components/";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MoreMenuStackParamList, CustomerForm } from "../../types";
import { useFetchWithGroupId } from "../../hooks";
import { apiUrl } from "../../config";
import { useState } from "react";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "DetailCustomer">;

const inputs: Record<keyof CustomerForm, string> = {
    name: "Nom",
    locationName: "Lieu",
    area: "Zone",
    email: "Mail",
    phoneNumber: "Numéro de téléphone",
};

function DetailCustomerScreen({ route }: Props) {
    const fetchWithGroupId = useFetchWithGroupId();
    const { name, email, phoneNumber } = route.params;
    const { name: locationName, area } = route.params.location;
    const [values, setValues] = useState<typeof inputs>({
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

        fetchWithGroupId(`${apiUrl}/Customers/${route.params._id}?${urlRequest}`, {
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
