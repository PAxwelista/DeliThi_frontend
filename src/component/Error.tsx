import { View, Text, StyleSheet } from "react-native";

type Props = {
    err: string;
};

export default function Error({ err }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{err}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    text: {
        color: "red",
    },
});
