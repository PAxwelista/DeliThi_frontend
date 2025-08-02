import { Alert } from "react-native";
import { Button, CustomModal, Error, PasswordInput, Screen, Text } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { disconnect } from "../../reducers/login";
import { useState } from "react";
import { apiUrl } from "../../config";

const AccountScreen = () => {
    const dispatch = useAppDispatch();
    const username = useAppSelector(state => state.login.username);
    const [password, setPassword] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleClickOnDeconnexion = () => {
        Alert.alert("Attention", "Voulez vous vraiment vous deconnecter?", [
            { text: "Non", style: "cancel" },
            { text: "Oui", onPress: handleDeconnexion },
        ]);
    };

    const handleClickOnDeleteAccount = () => {
        setShowModal(true);
    };

    const handleDeconnexion = () => {
        dispatch(disconnect());
    };

    const handleDeleteAcount = async () => {
        const response = await fetch(`${apiUrl}/users`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });
        const data = await response.json();
        
        setShowModal(false)
        setPassword("")
        if (data.result) {
            return handleDeconnexion();
        }
        setErrorMessage(data.error === "User not find or wrong password" ? "Mot de passe erroné" :  data.error)
    };

    const buttons = [
        { title: "Deconnection", onPress: handleClickOnDeconnexion },
        { title: "Supprimer le compte", onPress: handleClickOnDeleteAccount },
    ];

    const Buttons = buttons.map(button => (
        <Button
            key={button.title}
            title={button.title}
            onPress={button.onPress}
            isListMember
        />
    ));

    return (
        <Screen title="Compte">
            {errorMessage && <Error err={errorMessage} />}
            {Buttons}
            <CustomModal
                visible={showModal}
                handleCloseModal={() => setShowModal(false)}
            >
                <Text>
                    Vous allez supprimer votre compte.{"\n"}
                    Cette action est irréversible.{"\n"}
                    {"\n"}
                    Veuillez entrer votre mot de passe pour nous confirmer la suppression
                </Text>
                <PasswordInput
                    value={password}
                    onChangeText={(text: string) => setPassword(text)}
                />
                <Button
                    title="Supprimer le compte"
                    onPress={handleDeleteAcount}
                />
            </CustomModal>
        </Screen>
    );
};

export { AccountScreen };
