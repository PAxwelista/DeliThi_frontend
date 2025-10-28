import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Button, Input } from "../../../components";
import { useEffect, useState } from "react";
import { AvailableProduct } from "../../../types";
import { GlobalStyles } from "../../../styles/global";

type Prop = {
    availableProducts: AvailableProduct[];
    addProduct: (productId: string, quantity: number) => void;
};

export default function ProductAddingForm({ availableProducts, addProduct }: Prop) {
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedProductId, setSelectedProductId] = useState<string>("");

    const handleAddProduct = (selectedProductId: string, quantity: number) => {
        if (!selectedProductId) return;
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
            <View style={styles.pickerAndQty}>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={selectedProductId}
                        onValueChange={(id: string) => setSelectedProductId(id)}
                        itemStyle={[GlobalStyles.globalFontFamily, styles.pickerElmt]}
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
                    <View style={styles.qtyBtns}>
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
                </View>
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
        justifyContent:"space-around",
        backgroundColor:"white",
        borderRadius:10,
        padding:10,
        marginVertical:50
    },
    picker: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,
        margin: 2,
        minWidth:"30%",
        borderWidth:0.2
    },
    pickerElmt: {
        height: 120,
    },

    quantityContainer: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        justifyContent:"center",
        alignItems:"center",
        height: 70,
        width: 30,
    },
    quantityInput: {
        flex: 2,
    },
    pickerAndQty: {
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
        marginBottom:10
    },
    qtyBtns: {
        flexDirection: "column",
    },
    quantityChanger: {
        flex: 1,
        minHeight:10,
        minWidth:10,
        height:30,
        width:30,
        padding:0,
        alignItems:"center",
        justifyContent:"center"
    },
});
