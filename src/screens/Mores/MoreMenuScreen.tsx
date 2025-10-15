import { Screen, Button } from "../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MoreMenuStackParamList } from "../../types";
import { useAppSelector } from "../../hooks/redux";
import { Share } from "react-native";
import { useFetchWithAuth } from "../../hooks";
import { apiUrl } from "../../config";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "Menu">;

function MoreMenuScreen({ navigation }: Props) {
    const fetchWithAuth = useFetchWithAuth();

    const demoMode = useAppSelector(state => state.demoMode);
    const { role } = useAppSelector(state => state.login);

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

    const buttons = [
        { title: "Clients", onPress: () => navigation.navigate("Customers") },
        { title: "Carte Clients", onPress: () => navigation.navigate("CustomersMap") },
        ...(!demoMode.value ? [{ title: "Statistiques", onPress: () => navigation.navigate("OrdersStatForm") }] : []),
        { title: "Produits", onPress: () => navigation.navigate("Products") },
        ...(role === "admin" ? [{ title: "Partage token de connexion", onPress: handleShareGroupToken }] : []),
        { title: "Compte", onPress: () => navigation.navigate("Account") },
    ];

    const Buttons = buttons.map(button => (
        <Button
            key={button.title}
            title={button.title}
            onPress={button.onPress}
            isListMember
        />
    ));

    return <Screen title="Menu">{Buttons}</Screen>;
}

export { MoreMenuScreen };
