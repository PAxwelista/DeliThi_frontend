import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, Input } from "../../../components";
import { useEffect, useState } from "react";
import { AvailableProduct } from "../../../types";

type Prop = {
    availableProducts: AvailableProduct[];
    addProduct: (productId: string, quantity: number) => void;
};

export default function ProductAddingForm({ availableProducts, addProduct }: Prop) {
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedProductId, setSelectedProductId] = useState<string>("");

    const handleAddProduct = (selectedProductId : string, quantity : number) => {
        if (!selectedProductId) return 
        addProduct(selectedProductId, quantity);
    };

    useEffect(() => {
        availableProducts && setSelectedProductId(availableProducts[0]?._id);
    }, [availableProducts]);

    const PickerElmts = availableProducts?.map(v => (
        <Picker.Item
            key={v._id}
            label={v.name}
            value={v._id}
        />
    ));

    return (
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
                onPress={() => handleAddProduct(selectedProductId, quantity)}
            />
        </View>
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
        margin: 2,
        boxShadow: "1px 1px 1px black",
    },
    pickerElmt: {
        height: 120,
    },

    quantityChanger: {
        flex: 1,
    },

    quantityContainer: {
        flexDirection: "row",
        alignContent: "center",
    },
    quantityInput: {
        flex: 2,
    },
});
