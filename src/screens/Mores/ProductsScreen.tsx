import { StyleSheet, View, Modal, Text, TouchableOpacity } from "react-native";
import { Loading, Screen, Button, Input } from "../../components";
import { useFetch, useFormInput } from "../../hooks";
import { apiUrl } from "../../config";
import { AvailableProduct } from "../../types";
import { useState } from "react";
import { CustomModal } from "../../components/CustomModal";

function ProductsScreen() {
    const { values, handleChangeValue, reset } = useFormInput({ name: "", price: "" });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { data, isLoading } = useFetch(`${apiUrl}/products`);

    if (isLoading) return <Loading />;

    const handlePressProduct = () => {};

    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddNewProduct = () => {
        if (!values.name || !values.price) return setErrorMessage("Veuillez rentrez toutes les informations");
    };

    const AddNewProductForm = () => {
        return (
            <View style={styles.addProductForm}>
                <Input
                    placeholder="Nom"
                    value={values.name}
                    onChangeText={handleChangeValue("name")}
                />
                <Input
                    placeholder="Prix"
                    value={values.price}
                    onChangeText={handleChangeValue("price")}
                    keyboardType="numeric"
                />
                <Button
                    title="Ajouter produit"
                    onPress={handleAddNewProduct}
                />
            </View>
        );
    };

    const products = data?.products.map((v: AvailableProduct) => (
        <Button
            key={v._id}
            title={`${v.name} : ${v.price ? v.price + " euros" : "prix non définie"}`}
            onPress={handlePressProduct}
            isListMember
        />
    ));

    return (
        <Screen
            title="Produits"
            hasHeaderBar
        >
            <View style={styles.container}>
                {products}
                <Button
                    title="Nouveau produit"
                    onPress={handleOpenModal}
                />
            </View>
            <CustomModal
                visible={showModal}
                handleCloseModal={handleCloseModal}
            >
                <AddNewProductForm />
            </CustomModal>
        </Screen>
    );
}

export { ProductsScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
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
    addProductForm: {
        flex: 1,
        justifyContent: "center",
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
