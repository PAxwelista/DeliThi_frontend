import { Button, Screen } from "../../components";
import { StyleSheet, View, Text } from "react-native";
import { useFormInput } from "../../hooks";
import { useState } from "react";
import { apiUrl } from "../../config";
import { useDispatch } from "react-redux";
import { setLogin } from "../../reducers/login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ConnexionStackParamList } from "../../types";
import { InputForm } from "../../components/";
import { Checkbox } from "expo-checkbox";

type Props = NativeStackScreenProps<ConnexionStackParamList, "SignUp">;

const SignUp = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const [isChecked, setChecked] = useState(false);
    const { values, handleChangeValue, reset } = useFormInput({ username: "", password: "", token: "" });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const visible: Record<keyof typeof values, boolean> = {
        username: true,
        password: true,
        token: !isChecked,
    };

    const labelsFr: Record<keyof typeof values, string> = {
        username: "Nom d'utilisateur",
        password: "Mot de passe",
        token: "Token de connexion",
    };

    const handleChangeCheckedStatus = (checked: boolean) => {
        setChecked(checked);
        handleChangeValue("token")("");
    };

    const handleSignUp = async () => {
        setErrorMessage("");

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
            console.log(json)
            if (json.result) {
                
                reset();
                dispatch(setLogin(json.login));
            } else setErrorMessage(json.error);
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
                    {!isChecked && <Text>Si vous voulez rejoindre un groupe, demandez a l'admin un token de connexion</Text>}
                    <Button
                        title={"S'inscrire"}
                        onPress={handleSignUp}
                    />
                </View>
                <Button
                    title={"Retour Connexion"}
                    onPress={handleChangePage}
                />
            </View>
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
