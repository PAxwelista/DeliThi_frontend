import { Screen, Button, Loading, Error } from "../../components";
import { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Modal, Text } from "react-native";
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import {  useFetch ,useFetchWithGroupId} from "../../hooks";
import { apiUrl } from "../../config";
import ProductManager from "./components/ProductManager";
import NewCustomerForm from "./components/NewCustomerForm";
import { CustomerForm, AvailableProduct, Order, Product, Customer } from "../../types";
import { useAppSelector } from "../../hooks/redux";
import { CustomModal } from "../../components/CustomModal";


type AutocompleteDropdownController = {
    clear: () => void;
    open: () => void;
    close: () => void;
    toggle: () => void;
    setInputText: (text: string) => void;
} | null;

let inputDropdownCustomerRef: AutocompleteDropdownController;

function OrderCreationScreen() {
    const fetchWithGroupId = useFetchWithGroupId();
    const username = useAppSelector(state=>state.login.username)
    const [products, setProducts] = useState<Product[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [customer, setCustomer] = useState<Customer | undefined>(undefined);

    const {
        data: availableProducts,
        isLoading: isLoadingProductAvailable,
        error: errorProductAvailable,
    } = useFetch(`${apiUrl}/products/`);

    const {
        data: customerList,
        isLoading: isLoadingCustomerlist,
        error: errorCustomerList,
        refresh: refreshCustomerlist,
    } = useFetch(`${apiUrl}/customers/`);

    const handleOnSelectCustomer = (item: any) => {
        item && setCustomer(customerList.customers?.find((v: Customer) => v._id === item.id));
    };

    const handleAddProduct = (id: string, quantity: number) => {
        setProducts(products =>
            products.some(product => product._id === id)
                ? products.map(product =>
                      product._id === id ? { ...product, quantity: product.quantity + quantity } : product
                  )
                : [
                      ...products,
                      {
                          product: {
                              name: availableProducts?.products.find((v: AvailableProduct) => v._id === id)?.name || "",
                              price:
                                  availableProducts?.products.find((v: AvailableProduct) => v._id === id)?.price || "",
                          },
                          quantity,
                          _id: id || "",
                      },
                  ]
        );
    };

    const handleRemoveProduct = (id: string) => {
        setProducts(products => products.filter(product => product._id != id));
    };

    const handleValidateOrder = async () => {
        setErrorMessage("");
        let id: string | undefined = customer?._id;

        if (products.length === 0) {
            setErrorMessage("Il n'y a aucuns produits dans cette commande");
            return;
        } else if (!customer) {
            setErrorMessage("Veuillez choisir un client ou en créé un nouveau");
            return;
        }

        const response = await fetchWithGroupId(`${apiUrl}/orders?state=pending`);
        const data = await response.json();

        if (data.orders.some((order: Order) => order.customer._id === id)) {
            setErrorMessage("Commande existante en cours déjà enregistré avec ce client");
            return;
        }

        refreshCustomerlist;

        try {
            const response = await fetchWithGroupId(`${apiUrl}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    products: products.map(v => ({ product: v._id, quantity: v.quantity })),
                    orderer: username, 
                    customerId: id,
                    area: customer?.location.area,
                }),
            });
            const json = await response.json();

            if (json.result) {
                setMessage("Commande enregistrée");
                setProducts([]);
                inputDropdownCustomerRef?.setInputText("");
            } else setErrorMessage(json.error);
        } catch (error) {
            setErrorMessage("Erreur de connexion");
        }
    };

    const handleAddCustomer = async (customerInfos: CustomerForm) => {
        setShowModal(false);
        setCustomer(await AddnewCustomer(customerInfos));
        inputDropdownCustomerRef?.setInputText(customerInfos.name);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    async function AddnewCustomer(customerInfos: CustomerForm): Promise<Customer | undefined> {
        try {
            const response = await fetchWithGroupId(`${apiUrl}/customers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customerInfos),
            });
            const json = await response.json();
            if (json.result) {
                return json.data;
            } else setErrorMessage(json.error);
        } catch (error) {
            setErrorMessage("Erreur de connexion");
        }
        return undefined;
    }

    if (isLoadingProductAvailable || isLoadingCustomerlist) return <Loading />;
    if (errorProductAvailable || errorCustomerList) return <Error err={errorProductAvailable || errorCustomerList} />;

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
                            availableProducts={availableProducts?.products}
                            products={products}
                            addProduct={handleAddProduct}
                            removeProduct={handleRemoveProduct}
                        />

                        <View style={styles.customer}>
                            <AutocompleteDropdown
                                dataSet={customerList?.customers
                                    ?.sort((a: Customer, b: Customer) => a.name.localeCompare(b.name))
                                    .map((v: Customer) => ({ id: v._id, title: v.name }))}
                                onSelectItem={handleOnSelectCustomer}
                                clearOnFocus={false}
                                EmptyResultComponent={<View></View>}
                                textInputProps={{ placeholder: "Nom" }}
                                controller={functions => (inputDropdownCustomerRef = functions)}
                                containerStyle={styles.autocompleteStyle}
                            />

                            <Button
                                title="Ajouter un client"
                                onPress={() => setShowModal(true)}
                                style={styles.button}
                            />
                        </View>
                        {errorMessage && <Error err={errorMessage} />}
                        {message && <Text>{message}</Text>}
                        <Button
                            title="Valider commande"
                            onPress={handleValidateOrder}
                        />
                    </ScrollView>
                </KeyboardAvoidingView>

                <CustomModal visible={showModal} handleCloseModal={handleCloseModal}>
                <NewCustomerForm
                            addCustomer={handleAddCustomer}
                        />
                </CustomModal>
            </AutocompleteDropdownContextProvider>
        </Screen>
    );
}

export {OrderCreationScreen}

const styles = StyleSheet.create({
    container: { flex: 1 },
    globalScroll: {
        flexGrow: 1,
    },

    customer: {
        flex: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    autocompleteStyle: {
        width: "70%",
        borderRadius: 5,
        boxShadow: "1px 1px 1px black",
    },
    button: {
        width: "25%",
    },

    input: {
        height: 40,
    },
    modal: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 100,
        padding: 30,
        borderRadius: 20,
        backgroundColor: "white",
        borderWidth: 1,
    },
});
