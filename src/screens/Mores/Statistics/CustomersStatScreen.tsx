import { Screen, Text } from "../../../components";
import { useFetch } from "../../../hooks";
import { apiUrl } from "../../../config";

const CustomersStatScreen = () => {
    const { data, isLoading, error, refresh } = useFetch(`${apiUrl}/orders`);

    return (
        <Screen>
            <Text>Nombre total de clients actifs : </Text>
        </Screen>
    );
};

export { CustomersStatScreen };
