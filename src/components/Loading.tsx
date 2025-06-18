import { View, ActivityIndicator, StyleSheet } from "react-native";

export function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                accessibilityHint="loading"
                size="large"
                color="#3b82f6"
            />
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
});
