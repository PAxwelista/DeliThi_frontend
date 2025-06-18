import { View, Text, StyleSheet,TextStyle ,ViewStyle} from "react-native";

type Prop = {
    err: string,
    containerStyle? : ViewStyle
    textStyle? : TextStyle
};

export function Error({ err ,containerStyle,textStyle}: Prop) {
    return (
        <View style={[styles.container,containerStyle]}>
            <Text style={[styles.text,textStyle]}>{err}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "red",
    },
});
