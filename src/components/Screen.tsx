import { StyleSheet, ViewStyle, Platform, KeyboardAvoidingView, View, Keyboard } from "react-native";
import { Text } from "./Text";
import { useAppSelector } from "../hooks/redux";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    children: React.ReactNode;
    style?: ViewStyle;
    title?: string;
    hasHeaderBar?: boolean;
};

export function Screen({ children, style, title, hasHeaderBar = false }: Props) {
    const demoMode = useAppSelector(state => state.demoMode);
    const addPaddingTop = Platform.OS === "android" && !hasHeaderBar;

    return (
        <SafeAreaView
            edges={["top"]}
            style={styles.safeArea}
            onTouchStart={() => Keyboard.dismiss()}
        >
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                <View style={[styles.container, style]}>
                    {demoMode.value && <Text>DEMO, certaines fonctionnalitées ne marcheront pas.</Text>}
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
        flex: 1
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
