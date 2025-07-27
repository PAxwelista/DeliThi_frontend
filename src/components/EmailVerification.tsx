import { useEffect, useState } from "react";
import { Button } from "./Button";
import { CustomModal } from "./CustomModal";
import { Input } from "./Input";
import { Text } from "./Text";
import { apiUrl } from "../config";
import { Login } from "../types";

type Props = {
    username: string;
    show: boolean;
    setShow: (v: boolean) => void;
    finished: (value: { type: "error"; error: string } | { type: "success"; login: Login }) => void;
};

const EmailVerification = ({ username, show, setShow, finished }: Props) => {
    const [code, setCode] = useState<string>("");

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
    }, [show]);

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

    return (
        <CustomModal
            visible={show}
            handleCloseModal={() => setShow(false)}
        >
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
        </CustomModal>
    );
};

export { EmailVerification };
