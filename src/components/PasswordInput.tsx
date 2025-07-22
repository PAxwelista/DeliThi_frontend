import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, StyleSheet, TextInputProps } from "react-native";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { Input } from "./Input";

type Props = TextInputProps;

const PasswordInput = (props: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const { ...otherProps } = props;
    return (
        <View style={styles.container}>
            <Input
                {...otherProps}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
            />
            <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.icon}
            >
                <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    size={20}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    );
};

export { PasswordInput };

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", marginVertical: 5, minHeight: 40 },
    icon: {
        padding: 10,
        position: "absolute",
        right: 10,
    },
});
