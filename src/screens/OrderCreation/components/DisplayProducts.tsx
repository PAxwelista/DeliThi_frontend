import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import { Product } from "../../../types";

type Props = {
    products: Product[];
    removeProduct: (id: string) => void;
};

export default function DisplayProducts({ products, removeProduct }: Props) {
    const handleRemoveProduct = (id: string) => {
        removeProduct(id);
    };

    const productElmts = products.map(v => (
        <View
            style={styles.product}
            key={v._id}
        >
            <Text>
                {v.quantity}x {v.product.name}{" "}
            </Text>
            <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => handleRemoveProduct(v._id)}
            >
                <Text style={styles.removeBtnText}>-</Text>
            </TouchableOpacity>
        </View>
    ));

    return (
        <View style={styles.orders}>
            <ScrollView contentContainerStyle={styles.ordersScroll}>{productElmts}</ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    ordersScroll: {
        padding: 10,
    },

    orders: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
    },

    product: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
