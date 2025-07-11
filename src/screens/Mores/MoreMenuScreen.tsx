import { Screen, Button } from "../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MoreMenuStackParamList } from "../../types";
import { useAppDispatch } from "../../hooks/redux";
import { setLogin } from "../../reducers/login";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "Menu">;

function MoreMenuScreen({ navigation }: Props) {
    const dispatch = useAppDispatch();

    const deconnexion = () => {
        dispatch(setLogin({ username: "", groupId: "", role: "" }));
    };

    const buttons = [
        { title: "Clients", onPress: () => navigation.navigate("Customers") },
        { title: "Statistiques", onPress: () => navigation.navigate("Statistics") },
        { title: "Produits", onPress: () => navigation.navigate("Products") },
        { title: "Deconnexion", onPress: () => deconnexion() },
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
