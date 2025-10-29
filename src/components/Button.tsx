import { TouchableOpacity, StyleSheet, ViewStyle, ActivityIndicator, GestureResponderEvent } from "react-native";
import { Text } from "../components/Text";
import { useState } from "react";

type ButtonProps = {
    title?: string;
    onPress: (event: GestureResponderEvent) => void ;
    isListMember?: boolean;
    style?: ViewStyle;
    disable?: boolean;
    children?: React.ReactNode;
};

export function Button({ isListMember = false, disable = false, ...props }: ButtonProps) {
    const style = isListMember ? styles.delivery : styles.container;
    const [loading, isLoading] = useState<boolean>(false);

    const handleClick = async (event: GestureResponderEvent) => {
        isLoading(true);
        try {
            props.onPress(event);
        } finally {
            isLoading(false);
        }
    };

    return (
        <TouchableOpacity
            style={[style, props.style]}
            onPress={handleClick}
            disabled={disable || loading}
        >
            {loading ? (
                <ActivityIndicator
                    accessibilityHint="loading"
                    size="small"
                    color="#3b82f6"
                />
            ) : (
                props.children ?? <Text style={styles.text}>{props.title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#437CF7",
        margin: 2,
        padding: 10,
        minHeight: 42,
        borderRadius: 10,
        justifyContent: "center",
        
    },
    text: {
        textAlign: "center",
        color:"white"
    },
    delivery: {
        margin: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#437CF7",
    },
});
