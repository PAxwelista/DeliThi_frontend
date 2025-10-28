import { View, StyleSheet } from "react-native";
import { Button } from "./Button";
import { Text } from "./Text";
import { State } from "../types";
import frenchState from "../../assets/translation/frenchState.json";

type Props = {
    status: keyof typeof frenchState;
    customerName: string;
    price: number;
    onPress: () => void | Promise<void>;
};

const colorState = { pending: "#D5FFC4", processing: "#C4ECFF", delivered: "#D5D5D5", cancelled: "#FFC4C4" };

export const Order = ({ status, customerName, price, onPress }: Props) => {
    const orderColorStyle = { backgroundColor: colorState[status as State] };

    return (
        <Button
            onPress={onPress}
            style={styles.container}
        >
            <View style={styles.firstLine}>
                <View style={[orderColorStyle, styles.status]}>
                    <Text>{frenchState[status]}</Text>
                </View>
                <Text>{price.toFixed(2)}€</Text>
            </View>
            <Text style={styles.customer}>{customerName}</Text>
        </Button>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginVertical: 6,
        padding: 20,
        boxShadow: "",
    },
    firstLine: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    status: {
        padding: 10,
        borderRadius: 5,
    },
    customer: {
        paddingTop: 20,
    },
});
