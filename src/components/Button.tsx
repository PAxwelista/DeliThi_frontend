import { Text, TouchableOpacity, StyleSheet ,ViewStyle } from "react-native";

type ButtonProps = {
    title: string;
    onPress() : void
    isListMember? : boolean,
    style? : ViewStyle
};

export function Button({isListMember = false , ...props} : ButtonProps) {

    const style = isListMember ? styles.delivery : styles.container

    return (
        <TouchableOpacity style={[style,props.style]} onPress={props.onPress}>
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
    },
    delivery: {
        margin: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "lightblue",
        boxShadow: "2px 2px 5px black"
    },
});
