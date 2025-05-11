import Screen from "../../component/Screen";
import Input from "../../component/Input";
import { useState, useRef } from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import Button from "../../component/Button";
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { useFetch } from "../../hooks/useFetch";
import { Customer } from "../../types/customer";
import { apiUrl } from "../../config";
import { Product } from "../../types/product";
import ProductManager from "../../component/ProductManager";
import React from "react";
import AutoComplete from "../../component/Autocomplete";
import Loading from "../../component/Loading";
import Error from "../../component/Error";

type ProductItem = {
    id: string;
    product: string;
    quantity: number;
};

type AutocompleteDropdownController = {
    clear: () => void;
    open: () => void;
    close: () => void;
    toggle: () => void;
    setInputText: (text: string) => void;
} | null;

let inputDropdownCustomerRef : AutocompleteDropdownController
let inputDropdownLocationRef : AutocompleteDropdownController

export default function ConnectionScreen() {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [selectedLocationId, setSelectedLocationId] = useState<string>("");
    const [area, setArea] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [customerName, setCustomerName] = useState<string>("");
    const [customerLocation, setCustomerLocation] = useState<string>("");
    const [locationData, setLocationData] = useState([]);
    const [showClearLocationInput , setShowClearLocationinput] = useState<boolean>(true)

    const {
        data: productsAvailable,
        isLoading: isLoadingProductAvailable,
        error: errorProductAvailable,
    } = useFetch(`${apiUrl}/products/`);
    const {
        data: locationList,
        isLoading: isLoadingLocationlist,
        error: errorLocationList,
        refresh: refreshLocationlist,
    } = useFetch(`${apiUrl}/customers/`);

    const resetLocationinfos = () => {
        setArea("");
        setPhoneNumber("");
        setSelectedLocationId("");
        setCustomerLocation("");
        setCustomerName("");
        inputDropdownLocationRef?.setInputText("");
        inputDropdownCustomerRef?.setInputText("");
        setLocationData([])
    };

    const handleOnSelectCustomer = (item: any) => {
        
        const selectedLocation = locationList?.customers?.find((v: Product) => v._id === item?.id);

        item && setSelectedLocationId(item.id);

        if (selectedLocation) {
            setShowClearLocationinput(false)
            setArea(selectedLocation.location.area);
            setPhoneNumber(selectedLocation.phoneNumber);
            inputDropdownLocationRef?.setInputText(selectedLocation.location.name);
        }
    };

    const handleOnSelectLocation = (item: any) => {
        setCustomerLocation(item?.title);
    };

    const handleValidateOrder = async () => {
        setErrorMessage("");
        let id: string = selectedLocationId;

        if (products.length === 0) {
            setErrorMessage("Il n'y as aucuns produits dans cette commande");
            return;
        }

        if (!id) id = await AddnewCustomer();

        refreshLocationlist;

        try {
            const response = await fetch(`${apiUrl}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    products: products.map(v => ({ product: v.id, quantity: v.quantity })),
                    orderer: "axel", //a modifier en fonction de qui passe la commande
                    customerId: id,
                }),
            });
            const json = await response.json();
            if (json.result) {
                setErrorMessage("Reussi!!");
                resetLocationinfos();
                setProducts([]);
            } else setErrorMessage(json.error);
        } catch (error) {
            setErrorMessage("Erreur de connexion");
        }
    };

    const handleChangeTextLocation = async (value: string) => {
        if (value.length < 3) return;

        const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${value}`);

        const data = await response.json();

        setLocationData(data.features);
    };

    async function AddnewCustomer(): Promise<string> {
        console.log(customerName,customerLocation,area,phoneNumber)
        try {
            const response = await fetch(`${apiUrl}/customers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: customerName,
                    locationName: customerLocation,
                    area,
                    phoneNumber,
                }),
            });
            const json = await response.json();
            if (json.result) {
                return json.data._id;
            } else setErrorMessage(json.error);
        } catch (error) {
            setErrorMessage("Erreur de connexion");
        }
        return "";
    }

    if (isLoadingProductAvailable || isLoadingLocationlist) return <Loading/>
    if (errorProductAvailable || errorLocationList)
        return <Error err={errorProductAvailable || errorLocationList} />

    return (
        <Screen title="Nouvelle commande">
            <AutocompleteDropdownContextProvider>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior="padding"
                >
                    <ScrollView
                        contentContainerStyle={styles.globalScroll}
                        bounces={false}
                    >
                        <ProductManager
                            productsAvailable={productsAvailable?.products}
                            products={products}
                            setProducts={setProducts}
                        />

                        <View style={styles.coordinates}>
                            <AutocompleteDropdown
                                dataSet={locationList?.customers?.map((v: Customer) => ({ id: v._id, title: v.name }))}
                                onSelectItem={handleOnSelectCustomer}
                                clearOnFocus={false}
                                EmptyResultComponent={<View></View>}
                                textInputProps={{ placeholder: "Nom" }}
                                controller={functions => (inputDropdownCustomerRef = functions)}
                                onClear={resetLocationinfos}
                                onChangeText={value => setCustomerName(value)}
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
                                controller={functions => (inputDropdownLocationRef = functions)}
                                onChangeText={handleChangeTextLocation}
                                showChevron={false}
                                onClear={resetLocationinfos}
                                showClear={showClearLocationInput}
                            />

                            <View>
                                <Input
                                    placeholder="Zone"
                                    value={area}
                                    onChangeText={v => setArea(v)}
                                    style={styles.input}
                                />

                                <Input
                                    placeholder="Téléphone"
                                    keyboardType="decimal-pad"
                                    value={phoneNumber}
                                    onChangeText={v => setPhoneNumber(v)}
                                    style={styles.input}
                                />
                            </View>
                            {errorMessage && <Text>{errorMessage}</Text>}
                        </View>
                        <Button
                            title="Valider commande"
                            onPress={handleValidateOrder}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>
            </AutocompleteDropdownContextProvider>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    globalScroll: {
        flexGrow: 1,
    },

    coordinates: {
        flex: 3,
        justifyContent: "center",
    },

    errorMess: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        color: "red",
    },
    input: {
        height: 40,
    },
});
