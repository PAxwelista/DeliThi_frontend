
import { View,TextInput , StyleSheet , TextInputProps} from "react-native";


export default function Input(props : TextInputProps) {
    return (
        
        <View style={[styles.container,props.style]}>
            <TextInput {...props} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
       backgroundColor:"lightgrey",
       margin : 2,
       paddingHorizontal : 10,
       borderRadius:10,
    }
});
