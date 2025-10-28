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
        margin: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        boxShadow: "0.5px -0.5px 2px black",
    },
    textInput: {
        minHeight: 40,
    },
});
