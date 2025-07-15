import { Screen, Button } from "../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MoreMenuStackParamList } from "../../types";
import { useAppDispatch } from "../../hooks/redux";
import { setLogin } from "../../reducers/login";
import { Alert } from "react-native";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "Menu">;

function MoreMenuScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();

    const handleClickOnDeconnexion = () => {
        Alert.alert("Attention", "Voulez vous vraiment vous deconnecter?", [
            { text: "Non", style: "cancel" },
            { text: "Oui", onPress: handleDeconnexion },
        ]);
    };
    
    const handleDeconnexion = () => {
        dispatch(setLogin({ username: "", groupId: "", role: "" }));
    };

    const buttons = [
        { title: "Clients", onPress: () => navigation.navigate("Customers") },
        { title: "Statistiques", onPress: () => navigation.navigate("Statistics") },
        { title: "Produits", onPress: () => navigation.navigate("Products") },
        { title: "Deconnexion", onPress: handleClickOnDeconnexion },
    ];

    const Buttons = buttons.map(button => (
        <Button
            key={button.title}
            title={button.title}
            onPress={button.onPress}
            isListMember
        />
    ));

    return <Screen title="Autres menu">{Buttons}</Screen>;
}

export { MoreMenuScreen };
