import { Text } from "./Text";
import { View, StyleSheet } from "react-native";

export const DemoMode = () => {
    return (
        <View style={styles.container}>
            <View style={styles.goldLine}></View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>DEMO MODE</Text>
            </View>
            <View style={styles.goldLine}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "green",
        paddingVertical: 5,
    },
    textContainer: {
        padding: 10,
    },
    text: {
        color: "white",
        textAlign:"center",
        fontSize:20
    },
    goldLine: {
        borderWidth: 0.8,
        borderColor: "#FAD641",
    },
});
