import { View, StyleSheet } from "react-native";
import { Input, Button, Error } from "../../../components";
import { useFormInput } from "../../../hooks/";
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { useState } from "react";
import { CustomerForm } from "../../../types";

type PropType = {
    addCustomer: (values: CustomerForm) => void;
};

export default function NewCustomerForm({ addCustomer }: PropType) {
    const { values, handleChangeValue, reset } = useFormInput<CustomerForm>({
        name: "",
        locationName: "",
        area: "",
        phoneNumber: "",
        email: "",
    });
    const [locationData, setLocationData] = useState([]);
    const [error, setError] = useState<string>("");

    const handleResetForm = () => {
        reset();
    };
    const handleChangeTextLocation = async (value: string) => {
        if (value.length < 3) return;

        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}`);

        const data = await response.json();

        setLocationData(data.features);
    };

    const handleOnSelectLocation = (item: any) => {
        handleChangeValue("locationName")(item?.title);
    };

    const handleAddCustomer = () => {
        setError("");
        if (!values.locationName || !values.area) {
            return setError("Champ lieu et/ou zone non rempli");
        }
        addCustomer(values.name ? values : { ...values, name: values.locationName });
    };

    return (
        <AutocompleteDropdownContextProvider>
            <View style={styles.container}>
                <View>
                    <Input
                        placeholder="Nom"
                        value={values.name}
                        onChangeText={handleChangeValue("name")}
                        style={styles.input}
                    />
                    <AutocompleteDropdown
                        dataSet={locationData?.map((v: { properties: { id: string; label: string } }) => ({
                            id: v.properties.id,
                            title: v.properties.label,
                        }))}
                        onSelectItem={handleOnSelectLocation}
                        clearOnFocus={false}
                        EmptyResultComponent={<View></View>}
                        textInputProps={{ placeholder: "Lieu" }}
                        onChangeText={handleChangeTextLocation}
                        showChevron={false}
                        onClear={handleResetForm}
                    />
                    <Input
                        placeholder="Zone"
                        value={values.area}
                        onChangeText={handleChangeValue("area")}
                        style={styles.input}
                    />
                    <Input
                        placeholder="Téléphone"
                        value={values.phoneNumber}
                        onChangeText={handleChangeValue("phoneNumber")}
                        style={styles.input}
                    />
                    <Input
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChangeValue("email")}
                        style={styles.input}
                    />
                </View>
                {error && <Error err={error} />}
                <Button
                    title="Ajouter"
                    onPress={handleAddCustomer}
                />
            </View>
        </AutocompleteDropdownContextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    input: {
        height: 40,
    },
    closeBtnContainer: {
        alignItems: "flex-end",
    },
    closeBtn: {
        backgroundColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        width: 40,
        borderRadius: "50%",
    },
    textCloseBtn: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
