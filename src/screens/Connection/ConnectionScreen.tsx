import Input from "../../components/Input";
import Button from "../../components/Button";
import Screen from "../../components/Screen";
import { StyleSheet ,Text} from "react-native";
import { useInput } from "../../hooks/useInput";
import { useState } from "react";
import { apiUrl } from "../../config";

export default function ConnectionScreen() {
    const username = useInput();
    const password = useInput();
    const [errorMessage , setErrorMessage] = useState<string>("")

    const handleConnect = async () => {
        setErrorMessage("")
        try {
            const response = await fetch(`${apiUrl}/users/signin` , {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({username : username.value , password : password.value}),
              });
            const json = await response.json();
            if (json.result){
                setErrorMessage("Reussi!!")
                //ici déplacement vers une autre page et ajotuer également le nom de l'utilisateur dans data
            }
            else (setErrorMessage(json.error))
            
        } catch (error) {
            setErrorMessage("Erreur de connexion")
        }
    };

    return (
        <Screen title="Connection">
            <Input
                placeholder="Nom d'utilisateur"
                {...username}
            />
            <Input
                placeholder="Mot de passe"
                {...password}
                secureTextEntry
                autoCapitalize="none"
            />
            <Button
                title={"Se connecter"}
                onPress={handleConnect}
            />
            {errorMessage && <Text>{errorMessage}</Text>}
        </Screen>
    );
}

const styles = StyleSheet.create({
    element: {
        flex: 1,
    },
});
