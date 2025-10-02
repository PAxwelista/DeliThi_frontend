import { Button, EmailVerification, Input, Screen, Text } from "../../components";
import { StyleSheet, View } from "react-native";
import { useFormInput } from "../../hooks";
import { useState } from "react";
import { apiUrl } from "../../config";
import { useDispatch } from "react-redux";
import { setLogin } from "../../reducers/login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ConnexionStackParamList, Login } from "../../types";
import { InputForm } from "../../components/";
import { Checkbox } from "expo-checkbox";
import { isValidEmail, isSecurePassword } from "../../utils";

type Props = NativeStackScreenProps<ConnexionStackParamList, "SignUp">;

const SignUp = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const [isChecked, setChecked] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const { values, handleChangeValue, reset } = useFormInput({ username: "", password: "", token: "", email: "" });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const visible: Record<keyof typeof values, boolean> = {
        username: true,
        password: true,
        token: !isChecked,
        email: true,
    };

    const labelsFr: Record<keyof typeof values, string> = {
        username: "Nom d'utilisateur",
        password: "Mot de passe",
        token: "Token de connexion",
        email: "Email",
    };

    const handleEmailVerifFinished = (value: { type: "error"; error: string } | { type: "success"; login: Login }) => {
        if (value.type === "error") return setErrorMessage(value.error);

        dispatch(setLogin(value.login));
    };

    const handleChangeCheckedStatus = (checked: boolean) => {
        setChecked(checked);
        handleChangeValue("token")("");
    };

    const handleSignUp = async () => {
        setErrorMessage("");

        if (!isSecurePassword(values.password))
            return setErrorMessage(
                "Le mot de passe n'est pas sécurisé.\nModifiez le en suivant les consignes suivante :\n" +
                    "• Min. 8 charactères\n" +
                    "• Min. 1 lettre minuscule\n" +
                    "• Min. 1 lettre majuscule\n" +
                    "• Min. 1 chiffre\n" +
                    "• Min. 1 charactère spécial"
            );

        if (!isValidEmail(values.email)) return setErrorMessage("Cet email n'est pas valide");

        if (!(values.token || isChecked) || !values.password || !values.username)
            return setErrorMessage("Veuillez remplir toutes les infos");

        try {
            const response = await fetch(`${apiUrl}/users/signUp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const json = await response.json();
            if (json.result) {
                setShow(true);
            } else setErrorMessage(`Erreur d'inscription : ${json?.error}`);
        } catch (error) {
            setErrorMessage(`Erreur de connexion : ${error}`);
        }
    };

    const handleChangePage = () => {
        navigation.navigate("SignIn");
    };

    return (
        <Screen title="Inscription">
            <View style={styles.container}>
                <View>
                    {errorMessage && <Text>{errorMessage}</Text>}
                    <InputForm
                        values={values}
                        handleChangeValue={handleChangeValue}
                        labelsFr={labelsFr}
                        visible={visible}
                    />
                    <View style={styles.createNewGroup}>
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            onValueChange={handleChangeCheckedStatus}
                            color={isChecked ? "lightblue" : undefined}
                        />
                        <Text>Créez un nouveau groupe</Text>
                    </View>
                    {!isChecked && (
                        <Text>
                            Si vous voulez rejoindre un groupe existant, demandez à l'admin un token de connexion.
                        </Text>
                    )}
                    <Button
                        title={"S'inscrire"}
                        onPress={handleSignUp}
                    />
                </View>
                <Button
                    title={"Retour connexion"}
                    onPress={handleChangePage}
                />
            </View>
            <EmailVerification
                username={values.username}
                finished={handleEmailVerifFinished}
                show={show}
                setShow={setShow}
            />
        </Screen>
    );
};

export { SignUp };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
    },
    createNewGroup: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        margin: 10,
        padding: 10,
    },
});
