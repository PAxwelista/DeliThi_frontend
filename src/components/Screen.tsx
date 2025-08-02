import { SafeAreaView, StyleSheet, ViewStyle, Platform, KeyboardAvoidingView, View } from "react-native";
import { Text } from "./Text";

type Props = {
    children: React.ReactNode;
    style?: ViewStyle;
    title?: string;
    hasHeaderBar?: boolean;
};

export function Screen({ children, style, title, hasHeaderBar = false }: Props) {
    const addPaddingTop = Platform.OS === "android" && !hasHeaderBar;

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.KeyboardAvoidingView}
                
            >
                <View style={[styles.container, style]}>
                    {title && <Text style={styles.title}>{title}</Text>}
                    {children}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    KeyboardAvoidingView: {
        flex: 1,
        backgroundColor: "#F2F2F2",
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        paddingBottom: 30,
    },
});
