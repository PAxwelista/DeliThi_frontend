import { useEffect, useState } from "react";
import { Button } from "./Button";
import { CustomModal } from "./CustomModal";
import { Input } from "./Input";
import { Text } from "./Text";
import { apiUrl } from "../config";
import { Login } from "../types";
import { StyleSheet, View } from "react-native";
import { isValidEmail } from "../utils";
import { Error } from "./Error";

type Props = {
    username: string;
    show: boolean;
    setShow: (v: boolean) => void;
    finished: (value: { type: "error"; error: string } | { type: "success"; login: Login }) => void;
};

const EmailVerification = ({ username, show, setShow, finished }: Props) => {
    const [code, setCode] = useState<string>("");
    const [email , setEmail] = useState<string>("");
    const [refreshBool , setRefreshBool] = useState<boolean>(true)
    const [errorMessage , setErrorMessage]=useState<string>("")

    useEffect(() => {
        if (!show) return;

        (async () => {
            const response = await fetch(`${apiUrl}/users/sendNewEmailVerifCode`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username }),
            });
        })();
    }, [show,refreshBool]);

    const handleVerifyEmail = async () => {
        const response = await fetch(`${apiUrl}/users/verifyEmail`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, code }),
        });

        const json = await response.json();
        if (json.result) {
            setCode("");
            setShow(false);
            finished({ type: "success", login: json.login });
        } else {
            setCode("");
            setShow(false);
            finished({ type: "error", error: json.error });
        }
    };

    const handleChangeEmail =async () => {
        setErrorMessage("")
        if (!isValidEmail(email)) return setErrorMessage("Email non valide")

        const response = await fetch(`${apiUrl}/users/updateEmail`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email }),
        });

        const data = await response.json()

        if (!data.result) return setErrorMessage(`Erreur : ${data.error}`)

        setRefreshBool(v=>!v)
    };

    return (
        <CustomModal
            visible={show}
            handleCloseModal={() => setShow(false)}
        >
            <View style={styles.textAndCodeValidation}>
                <Text>Veuillez rentrez le code que vous allez recevoir par mail (vérifiez vos SPAM)</Text>
                <Input
                    placeholder="Code"
                    value={code}
                    onChangeText={setCode}
                />
                <Button
                    title="Valider"
                    onPress={handleVerifyEmail}
                />
            </View>
            {errorMessage && <Error err={errorMessage}/>}
            <Text>Vous pouvez changez votre adresse mail si vous vous êtes trompé</Text>
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <Button
                title="Changer votre adresse mail"
                onPress={handleChangeEmail}
            />
        </CustomModal>
    );
};

export { EmailVerification };

const styles = StyleSheet.create({
    textAndCodeValidation: {
        flex: 1,
    },
});
