import { SafeAreaView, StyleSheet, Text, ViewStyle } from "react-native";

type Props = {
    children: React.ReactNode;
    style?: ViewStyle;
    title?: string;
};

export default function Screen({ children, style, title }: Props) {
    return (
        <SafeAreaView style={[styles.container, style]}>
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
