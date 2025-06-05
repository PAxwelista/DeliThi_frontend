import { Text } from "react-native";
import Screen from "../../component/Screen";
import Button from "../../component/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MoreMenuStackParamList } from "../../types/navigation";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "Menu">;

const buttons: { title: string; route: keyof  MoreMenuStackParamList}[] = [
    { title: "Clients", route: "Customers" },
    { title: "Statistiques", route: "Statistics" },
];

export default function MoreMenuScreen({ navigation }: Props) {
    const Buttons = buttons.map(button => (
        <Button
            key={button.route}
            title={button.title}
            onPress={() => navigation.navigate(button.route)}
        />
    ));

    return (
        <Screen title ="Autres menu">
            {Buttons}
        </Screen>
    );
}
