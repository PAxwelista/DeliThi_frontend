import { SafeAreaView, StyleSheet, Text, ViewStyle, Platform, StatusBar } from "react-native";

type Props = {
    children: React.ReactNode;
    style?: ViewStyle;
    title?: string;
    hasHeaderBar?: boolean;
};

export function Screen({ children, style, title, hasHeaderBar = false }: Props) {
    const addPaddingTop = Platform.OS === "android" && !hasHeaderBar;

    const styleSafeArea = { paddingTop: addPaddingTop ? StatusBar.currentHeight : 0 };

    return (
        <SafeAreaView style={[styleSafeArea, styles.container, style]}>
            {title && <Text style={styles.title}>{title}</Text>}
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    title: {
        textAlign: "center",
        fontSize: 30,
    },
});
