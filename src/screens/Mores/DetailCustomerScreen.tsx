import { Screen } from "../../components/";
import { Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MoreMenuStackParamList } from "../../types";

type Props = NativeStackScreenProps<MoreMenuStackParamList, "DetailCustomer">;

export default function DetailCustomerScreen({ route }: Props) {
    console.log(route);

    return (
        <Screen>
            <Text>here</Text>
        </Screen>
    );
}
