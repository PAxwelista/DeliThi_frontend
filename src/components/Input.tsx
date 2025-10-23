import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { GlobalStyles } from "../styles/global";

export function Input(props: TextInputProps) {
    const {onChangeText , ...rest} = props

    const handleTrimmedChangeText = (text:string) =>{
        onChangeText && onChangeText(text.trim())
        
    }
    
    return (
        <View style={[styles.container, props.style]}>
            <TextInput
                {...rest}
                onChangeText={handleTrimmedChangeText}
                style={[GlobalStyles.globalFontFamily , styles.textInput]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "lightgrey",
        margin: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        boxShadow: "-1px -1px 3px black",
    },
    textInput: {
        minHeight: 40,
    },
});
