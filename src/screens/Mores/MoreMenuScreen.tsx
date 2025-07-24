import { Screen, Button } from "../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MoreMenuStackParamList } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { disconnect } from "../../reducers/login";
import { Alert, Share } from "react-native";
import { useFetchWithAuth } from "../../hooks";
import { apiUrl } from "../../config";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "Menu">;

function MoreMenuScreen({ navigation }: Props) {
    const fetchWithAuth = useFetchWithAuth();
    const dispatch = useAppDispatch();
    const { role } = useAppSelector(state => state.login);

    const handleClickOnDeconnexion = () => {
        Alert.alert("Attention", "Voulez vous vraiment vous deconnecter?", [
            { text: "Non", style: "cancel" },
            { text: "Oui", onPress: handleDeconnexion },
        ]);
    };

    const handleShareGroupToken = async () => {
        const response = await fetchWithAuth(`${apiUrl}/groups/invite-token`);

        const data = await response.json();

        try {
            const result = Share.share({
                title: "Token pour rejoindre un groupe",
                message: `Ci-joint le token pour rejoindre le groupe : ${data.token}`,
            });
        } catch (error) {
            console.error("Erreur lors du partage :", error);
        }
    };

    const handleDeconnexion = () => {
        dispatch(disconnect());
    };

    const buttons = [
        { title: "Clients", onPress: () => navigation.navigate("Customers") },
        { title: "Carte Clients", onPress: () => navigation.navigate("CustomersMap") },
        { title: "Statistiques", onPress: () => navigation.navigate("OrdersStatForm") },
        { title: "Produits", onPress: () => navigation.navigate("Products") },
        ...(role === "admin" ? [{ title: "Partage token de connexion", onPress: handleShareGroupToken }] : []),
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
