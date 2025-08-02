import { Screen, Button } from "../../../components";
import { MoreMenuStackParamList } from "../../../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "Statistics">;

function StatisticsScreen({ navigation }: Props) {
    const boutons = [
        { name: "Produits", onPress: () => navigation.navigate("ProductsStat") },
        { name: "Clients", onPress: () => navigation.navigate("CustomersStat") },
        { name: "Commandes", onPress: () => navigation.navigate("OrdersStatForm") },
    ];

    const Boutons = boutons.map(v => (
        <Button
            key={v.name}
            title={v.name}
            onPress={v.onPress}
        />
    ));

    return (
        <Screen
            title="Statistiques"
            hasHeaderBar
        >
            {Boutons}
        </Screen>
    );
}

export { StatisticsScreen };
