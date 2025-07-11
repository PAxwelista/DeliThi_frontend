import { View, StyleSheet } from "react-native";
import { Button, Input } from "../../../components";

type Props = {
    values: Record<string, string>;
    handleChangeValue: (key: string) => (value: string) => void;
    handleAddNewProduct: () => void;
};

const AddNewProductForm = ({ values, handleChangeValue, handleAddNewProduct }: Props) => {
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

export { AddNewProductForm };

const styles = StyleSheet.create({
    addProductForm: {
        flex: 1,
        justifyContent: "center",
    },
});
