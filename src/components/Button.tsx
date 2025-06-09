import { Text, TouchableOpacity, StyleSheet ,ViewStyle } from "react-native";

type ButtonProps = {
    title: string;
    onPress() : void
    style? : ViewStyle
};

export default function Button(props: ButtonProps) {
    return (
        <TouchableOpacity style={[styles.container,props.style]} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        
        backgroundColor: "lightblue",
        margin: 2,
        padding: 10,
        borderRadius: 10,
    },
    text : {
        textAlign:"center"
    }
});
