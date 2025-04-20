import Screen from "../../component/Screen";
import Input from "../../component/Input";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "../../component/Button";
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { useFetch } from "../../hooks/useFetch";
import { Customer } from "../../types/customer";
import { apiUrl } from "../../config";


type Product = {
    _id: string;
    name: string;
};

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

let inputNameRef: AutocompleteDropdownController;
let inputLocationRef: AutocompleteDropdownController;

export default function ConnectionScreen() {
    const [selectedProduct, setSelectedProduct] = useState<Product>();
    const [quantity, setQuantity] = useState<number>(1);
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [selectedLocationId, setSelectedLocationId] = useState<string>("");
    const [area, setArea] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [customerName, setCustomerName] = useState<string>("");
    const [customerLocation, setCustomerLocation] = useState<string>("");

    const {
        data: productAvailable,
        isLoading: isLoadingProductAvailable,
        error: errorProductAvailable,
    } = useFetch(`${apiUrl}/products/`);
    const {
        data: locationList,
        isLoading: isLoadingLocationlist,
        error: errorLocationList,
    } = useFetch(`${apiUrl}/customers/`);

    useEffect(() => {
        productAvailable &&
            setSelectedProduct({ name: productAvailable.products[0].name, _id: productAvailable.products[0]._id });
    }, [productAvailable]);

    const handleAddProduct = () => {
        setProducts(products =>
            products.some(product => product.product === selectedProduct?.name)
                ? products.map(product =>
                      product.product === selectedProduct?.name
                          ? { ...product, quantity: product.quantity + quantity }
                          : product
                  )
                : [...products, { product: selectedProduct?.name || "", quantity, id: selectedProduct?._id || "" }]
        );
    };

    const resetLocationinfos = () => {
        setArea("");
        setPhoneNumber("");
        console.log(inputNameRef)
        inputNameRef?.setInputText("");
        inputLocationRef?.setInputText("");
        setSelectedLocationId("");
        setCustomerLocation("")
        setCustomerName("")
    };

    const handleOnSelectCustomer = (item: any) => {
        const selectedLocation = locationList?.customers?.find((v: Product) => v._id === item?.id);

        item && setSelectedLocationId(item.id);

        if (selectedLocation) {
            setArea(selectedLocation.location.area);
            setPhoneNumber(selectedLocation.phoneNumber);
            inputNameRef?.setInputText(selectedLocation.name);
            inputLocationRef?.setInputText(selectedLocation.location.name);
        }
    };

    const handleValidateOrder = async () => {
        setErrorMessage("");

        if (products.length === 0){
            setErrorMessage("Il n'y as aucuns produits dans cette commande");
            return;
        }

        if (!selectedLocationId) AddnewCustomer();

        try {
            const response = await fetch(`${apiUrl}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    products: products.map(v => ({ product: v.id, quantity: v.quantity })),
                    orderer: "axel", //a modifier en fonction de qui passe la commande
                    customerId: selectedLocationId,
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

    const AddnewCustomer = async () => {
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
                setSelectedLocationId(json.data._id);
            } else setErrorMessage(json.error);
        } catch (error) {
            setErrorMessage("Erreur de connexion");
        }
    };

    const PickerElmts = productAvailable?.products?.map((v: Product) => (
        <Picker.Item
            key={v._id}
            label={v.name}
            value={{ _id: v._id, name: v.name }}
        />
    ));

    const productElmts = products.map(v => (
        <Text key={v.product}>
            {v.quantity}x {v.product}{" "}
        </Text>
    ));

    if (isLoadingProductAvailable || isLoadingLocationlist) return <Text>Chargement...</Text>;
    if (errorProductAvailable || errorLocationList)
        return <Text>Erreur : {errorProductAvailable || errorLocationList}</Text>;

    return (
        <Screen title="Nouvelle commande">
            <AutocompleteDropdownContextProvider>
                <View style={styles.ordersChoices}>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={selectedProduct}
                            onValueChange={(v: Product) => setSelectedProduct(v)}
                        >
                            {PickerElmts}
                        </Picker>
                    </View>
                    <View style={styles.quantityContainer}>
                        <Input
                            placeholder="Qté"
                            keyboardType="decimal-pad"
                            style={styles.quantityInput}
                            value={quantity.toString()}
                            onChangeText={v => (Number(v) > 0 ? setQuantity(Number(v)) : setQuantity(0))}
                        />
                        <Button
                            title="+"
                            style={styles.quantityChanger}
                            onPress={() => setQuantity(v => v + 1)}
                        />
                        <Button
                            title="-"
                            style={styles.quantityChanger}
                            onPress={() => setQuantity(v => (v > 1 ? v - 1 : 1))}
                        />
                    </View>
                    <Button
                        title="Ajouter"
                        onPress={handleAddProduct}
                    />
                </View>
                <View style={styles.orders}>{productElmts}</View>
                <View style={styles.coordinates}>
                    <AutocompleteDropdown
                        dataSet={locationList?.customers?.map((v: Customer) => ({ id: v._id, title: v.name }))}
                        onSelectItem={handleOnSelectCustomer}
                        clearOnFocus={false}
                        EmptyResultComponent={<></>}
                        textInputProps={{ placeholder: "Nom" }}
                        controller={functions => (inputNameRef = functions)}
                        onClear={resetLocationinfos}
                        onChangeText={value => setCustomerName(value)}
                    />
                    <AutocompleteDropdown
                        dataSet={locationList?.customers?.map((v: Customer) => ({ id: v._id, title: v.location.name }))}
                        onSelectItem={handleOnSelectCustomer}
                        clearOnFocus={false}
                        EmptyResultComponent={<></>}
                        textInputProps={{ placeholder: "Lieu" }}
                        controller={functions => (inputLocationRef = functions)}
                        onClear={resetLocationinfos}
                        onChangeText={value => setCustomerLocation(value)}
                    />
                    <View>
                        <Input
                            placeholder="Zone"
                            value={area}
                            onChangeText={v => setArea(v)}
                        />

                        <Input
                            placeholder="Téléphone"
                            keyboardType="decimal-pad"
                            value={phoneNumber}
                            onChangeText={v => setPhoneNumber(v)}
                        />
                    </View>
                    {errorMessage && <Text>{errorMessage}</Text>}
                </View>
                <Button
                    title="Valider commande"
                    onPress={handleValidateOrder}
                />
            </AutocompleteDropdownContextProvider>
        </Screen>
    );
}

const styles = StyleSheet.create({
    ordersChoices: {
        flex: 2,
        justifyContent: "center",
    },
    orders: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    coordinates: {
        flex: 3,
        justifyContent: "center",
    },
    quantityContainer: {
        flexDirection: "row",
        alignContent: "center",
    },
    quantityInput: {
        flex: 2,
    },
    quantityChanger: {
        flex: 1,
    },
    picker: {
        backgroundColor: "lightgrey",
        borderRadius: 10,
    },
});
