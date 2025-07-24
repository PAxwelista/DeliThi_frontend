import { Input, Button, Screen } from "../../components";
import { StyleSheet, Text, View } from "react-native";
import { useInput } from "../../hooks";
import { useState } from "react";
import { apiUrl } from "../../config";
import { useDispatch } from "react-redux";
import { setLogin } from "../../reducers/login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ConnexionStackParamList } from "../../types";
import {PasswordInput} from "../../components/PasswordInput";
import { saveSecureStore } from "../../utils";

type Props = NativeStackScreenProps<ConnexionStackParamList, "SignIn">;

const SignIn = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const username = useInput();
    const password = useInput();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSignIn = async () => {
        setErrorMessage("");
        try {
            const response = await fetch(`${apiUrl}/users/signIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username.value, password: password.value }),
            });
            const json = await response.json();
            if (json.result) {
                await saveSecureStore("refreshToken" , json.login.refreshToken)
                dispatch(setLogin(json.login));
            } else setErrorMessage(json.error);
        } catch (error) {
            setErrorMessage("Erreur de connexion");
        }
    };

    const handleChangePage = () => {
        navigation.navigate("SignUp");
    };

    return (
        <Screen title="Connection">
            <View style={styles.btns}>
                <View>
                    {errorMessage && <Text>{errorMessage}</Text>}
                    <Input
                        placeholder="Nom d'utilisateur"
                        {...username}
                    />
                    <PasswordInput
                        placeholder="Mot de passe"
                        {...password}
                        
                    />
                    <Button
                        title={"Se connecter"}
                        onPress={handleSignIn}
                    />
                </View>

                <Button
                    title={"Inscription"}
                    onPress={handleChangePage}
                />
            </View>
        </Screen>
    );
};

export { SignIn };

const styles = StyleSheet.create({
    btns: {
        flex: 1,
        justifyContent: "space-around",
    },
});
