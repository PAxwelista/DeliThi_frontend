import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "./Button";
import Input from "./Input";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

type productAvailable = {
    _id: string;
    name: string;
};

type ProductItem = {
    id: string;
    product: string;
    quantity: number;
};

type Props = {
    productsAvailable: productAvailable[];
    products: ProductItem[];
    setProducts: Dispatch<SetStateAction<ProductItem[]>>;
};

export default function ProductManager({ productsAvailable, products, setProducts }: Props) {
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedProductId, setSelectedProductId] = useState<string>("");

    useEffect(() => {
        productsAvailable && setSelectedProductId(productsAvailable[0]?._id);
    }, [productsAvailable]);

    const handleAddProduct = () => {
        setProducts((products: ProductItem[]) =>
            products.some((product: ProductItem) => product.id === selectedProductId)
                ? products.map(product =>
                      product.id === selectedProductId ? { ...product, quantity: product.quantity + quantity } : product
                  )
                : [
                      ...products,
                      {
                          product:
                              productsAvailable?.find((v: productAvailable) => v._id === selectedProductId)?.name || "",
                          quantity,
                          id: selectedProductId || "",
                      },
                  ]
        );
    };

    const handleRemoveProduct = (id: string) => {
        setProducts((products: ProductItem[]) => products.filter(product => product.id != id));
    };

    const PickerElmts = productsAvailable?.map((v: productAvailable) => (
        <Picker.Item
            key={v._id}
            label={v.name}
            value={v._id}
        />
    ));

    const productElmts = products.map(v => (
        <View
            style={styles.product}
            key={v.product}
        >
            <Text>
                {v.quantity}x {v.product}{" "}
            </Text>
            <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => handleRemoveProduct(v.id)}
            >
                <Text style={styles.removeBtnText}>-</Text>
            </TouchableOpacity>
        </View>
    ));

    return (
        <>
            <View style={styles.ordersChoices}>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={selectedProductId}
                        onValueChange={(id: string) => setSelectedProductId(id)}
                        itemStyle={styles.pickerElmt}
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
            <View style={styles.orders}>
                <ScrollView contentContainerStyle={styles.ordersScroll}>{productElmts}</ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    ordersChoices: {
        flex: 2,
        justifyContent: "center",
    },
    picker: {
        backgroundColor: "lightgrey",
        borderRadius: 10,
    },
    pickerElmt: {
        height: 100,
    },
    ordersScroll: {
        padding: 10,
    },
    quantityChanger: {
        flex: 1,
    },
    orders: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
    },
    quantityContainer: {
        flexDirection: "row",
        alignContent: "center",
    },
    quantityInput: {
        flex: 2,
    },
    product: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center"
    },
    removeBtn: {
        height: 30,
        width: 30,
        margin: 5,
        backgroundColor: "lightgrey",
        borderRadius: 20,
        textAlignVertical: "top",
    },
    removeBtnText: {
        fontSize: 20,
        textAlign: "center",
        alignItems: "center",
    },
});
