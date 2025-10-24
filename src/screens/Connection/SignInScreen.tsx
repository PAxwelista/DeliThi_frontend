import { Input, Button, Screen, PasswordInput, Text, EmailVerification, ForgotPassword } from "../../components";
import { StyleSheet, View } from "react-native";
import { useInput } from "../../hooks";
import { useState } from "react";
import { apiUrl } from "../../config";
import { useDispatch } from "react-redux";
import { setLogin } from "../../reducers/login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ConnexionStackParamList, Login } from "../../types";
import { setDemoMode } from "../../reducers/demoMode";

type Props = NativeStackScreenProps<ConnexionStackParamList, "SignIn">;

const SignIn = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const username = useInput();
    const password = useInput();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const [showForgotPassword , setShowForgotPassword] =useState<boolean>(false)

    const handleEmailVerifFinished = (value: { type: "error"; error: string } | { type: "success"; login: Login }) => {
        if (value.type === "error") return setErrorMessage(value.error);

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

    const handleDemoMode = () => {
        dispatch(setDemoMode(true));
    };

    const handleForgotPassword = () => {
        setShowForgotPassword(true)
    };

    return (
        <Screen title="Connexion">
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
                <View>
                    <Button
                        title={"Inscription"}
                        onPress={handleChangePage}
                    />
                    <Button
                        title={"Mot de passe oublié"}
                        onPress={handleForgotPassword}
                    />
                    <Button
                        title={"Essayer sans compte"}
                        onPress={handleDemoMode}
                    />
                </View>
            </View>
            <EmailVerification
                username={username.value}
                finished={handleEmailVerifFinished}
                show={show}
                setShow={setShow}
            />
            <ForgotPassword
            show={showForgotPassword}
            setShow={setShowForgotPassword}/>
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
