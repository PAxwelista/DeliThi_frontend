import { transformWordToColor ,isDarkColor } from "../utils";
import { Button } from "./Button";
import { Text } from "./Text";
import { StyleSheet, View } from "react-native";

type Props = {
    onPress: () => void | Promise<void>;
    area: string;
    deliveryDate: string;
    nbCustomers: number;
};

export const Delivery = ({ onPress, area, deliveryDate, nbCustomers }: Props) => {
    const color = transformWordToColor(area)
    const isDark = isDarkColor(color)
    const areaStyle = { backgroundColor: color ,color:isDark?"white":"black"};
    return (
        <Button
            onPress={onPress}
            style={styles.container}
        >
            <View style={styles.firstLine}>
                <Text style={[styles.area, areaStyle]}>{area}</Text>
                <Text>
                    {nbCustomers} client{nbCustomers > 1 && "s"}
                </Text>
            </View>
            <Text>{new Date(deliveryDate).toLocaleDateString()}</Text>
        </Button>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginVertical: 10,
        padding: 20,
    },
    firstLine: {
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    area: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
    },
});
