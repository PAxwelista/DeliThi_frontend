import { Screen, Button, Input } from "../../components/";
import { Text, View, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MoreMenuStackParamList, CustomerForm } from "../../types";
import { useFormInput ,useFetchWithGroupId} from "../../hooks";
import { apiUrl } from "../../config";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "DetailCustomer">;

const inputs: Record<keyof CustomerForm, string> = {
    name: "Nom",
    locationName: "Lieu",
    area: "Zone",
    email: "Mail",
    phoneNumber: "Numéro de téléphone",
};

function DetailCustomerScreen({ route }: Props) {
    const { name, email, phoneNumber } = route.params;
    const { name: locationName, area } = route.params.location;
    

    const { values, handleChangeValue } = useFormInput<CustomerForm>({
        name,
        locationName,
        area,
        phoneNumber,
        email,
    });

    const isInitialValues =
        JSON.stringify(values) ===
        JSON.stringify({
            name,
            locationName,
            area,
            phoneNumber,
            email,
        });

    const btnStyle = isInitialValues ? { backgroundColor: "grey" } : {};

    const handleValidateModifications = () => {
        const urlRequest = Object.entries(values)
            .map(([key, value]) => key + "=" + value)
            .join("&");

            useFetchWithGroupId(`${apiUrl}/Customers/${route.params._id}?${urlRequest}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    const Inputs = Object.entries(inputs).map(([key, value]) => {
        const k = key as keyof CustomerForm;
        return (
            <View
                key={k}
                style={styles.inputContainer}
            >
                <Text>{value}</Text>
                <Input
                    value={values[k]}
                    onChangeText={handleChangeValue(k)}
                />
            </View>
        );
    });

    return (
        <Screen title="Client" hasHeaderBar>
            <View style={styles.container}>
                {Inputs}
                <Button
                    title="Valider changements"
                    onPress={handleValidateModifications}
                    disable={isInitialValues}
                    style={btnStyle}
                />
            </View>
        </Screen>
    );
}

export {DetailCustomerScreen}

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 5,
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
});
