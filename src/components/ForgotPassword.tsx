import { StyleSheet } from "react-native";
import { CustomModal } from "./CustomModal";
import { Input } from "./Input";
import { Text } from "./Text";
import { Button } from "./Button";
import { Error } from "./Error";
import { useState } from "react";
import { useFetch, useInput } from "../hooks";
import { PasswordInput } from "./PasswordInput";
import { apiUrl } from "../config";

type Props = { show: boolean; setShow: (v: boolean) => void };

export const ForgotPassword = ({ show, setShow }: Props) => {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const emailInput = useInput("");
    const codeInput = useInput("");
    const newPasswordInput = useInput("");

    const handleSendEmail = async () => {
        setErrorMessage("");
        if (!emailInput.value) return setErrorMessage("Email manquant");

        const response = await fetch(`${apiUrl}/users/forgotPassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: emailInput.value }),
        });

        const data = await response.json();

        if (!data.result) setErrorMessage(data.error);

        setMessage("Email envoyé");
    };
    const handleChangePassword = async () => {
        setErrorMessage("");
        if (!emailInput.value || !codeInput.value || !newPasswordInput.value)
            return setErrorMessage("Infos manquantes");

        const response = await fetch(`${apiUrl}/users/password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: emailInput.value,
                newPassword: newPasswordInput.value,
                forgetPasswordCode: codeInput.value,
            }),
        });

        const data = await response.json();
        console.log(data);
        if (!data.result) setErrorMessage(data.error);

        setMessage("Mot de passe modifié");

        setShow(false)

        emailInput.setValue("")
        codeInput.setValue("")
        newPasswordInput.setValue("")
    };

    return (
        <CustomModal
            style={styles.container}
            visible={show}
            handleCloseModal={() => setShow(false)}
        >
            <Text style={styles.title}>Mot de passe oublié</Text>
            <Text>Email</Text>
            <Input {...emailInput}></Input>
            <Button
                title={"Envoyer le code a votre adresse mail"}
                onPress={handleSendEmail}
            />
            <Text>Code</Text>
            <Input
                keyboardType="decimal-pad"
                {...codeInput}
            ></Input>
            <Text>Nouveau mot de passe</Text>
            <PasswordInput {...newPasswordInput}></PasswordInput>
            <Button
                title={"Changer le mot de passe"}
                onPress={handleChangePassword}
            />
            {message && <Text style={styles.message}>{message}</Text>}
            {errorMessage && <Error err={errorMessage} />}
        </CustomModal>
    );
};

const styles = StyleSheet.create({
    container: { display: "flex" },
    title: {
        textAlign: "center",
        fontSize: 20,
        marginVertical: 20,
    },
    message: { textAlign: "center", marginVertical: 10 },
});
