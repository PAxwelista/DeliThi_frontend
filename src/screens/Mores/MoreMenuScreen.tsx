import { Screen, Button } from "../../components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MoreMenuStackParamList } from "../../types";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "Menu">;

const buttons: { title: string; route: Exclude<keyof MoreMenuStackParamList, "DetailCustomer"> }[] = [
    { title: "Clients", route: "Customers" },
    { title: "Statistiques", route: "Statistics" },
    { title: "Produits", route: "Products" },
];

function MoreMenuScreen({ navigation }: Props) {
    const Buttons = buttons.map(button => (
        <Button
            key={button.route}
            title={button.title}
            onPress={() => {
                navigation.navigate(button.route);
            }}
            isListMember
        />
    ));

    return <Screen title="Autres menu">{Buttons}</Screen>;
}

export { MoreMenuScreen };
