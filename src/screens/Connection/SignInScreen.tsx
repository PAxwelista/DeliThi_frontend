import { Input, Button, Screen, PasswordInput, Text, EmailVerification } from "../../components";
import { StyleSheet, View } from "react-native";
import { useInput } from "../../hooks";
import { useState } from "react";
import { apiUrl } from "../../config";
import { useDispatch } from "react-redux";
import { setLogin } from "../../reducers/login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ConnexionStackParamList, Login,defaultLoginValue } from "../../types";

type Props = NativeStackScreenProps<ConnexionStackParamList, "SignIn">;

const SignIn = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const username = useInput();
    const password = useInput();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);

    const handleEmailVerifFinished = (value: {type : "error" ;error: string} | {type:"success";login : Login}) => {
        if (value.type==="error") return setErrorMessage(value.error);

        dispatch(setLogin(value.login));
    };

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
                
                if (json.login?.emailVerified === false) {
                    setShow(true);
                    return;
                }
                dispatch(setLogin(json.login));
            } else {
                return setErrorMessage(json.error);
            }
        } catch (error) {
            setErrorMessage(`Erreur de connexion : ${error}`);
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
            <EmailVerification
                username={username.value}
                finished={handleEmailVerifFinished}
                show={show}
                setShow={setShow}
            />
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
