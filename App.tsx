import { NavigationContainer } from "@react-navigation/native";
import { useAppSelector } from "./src/hooks/redux";
import { Store } from "./src/store";
import { Main } from "./src/stacks/main";
import { Connexion } from "./src/stacks";

const Navigation = () => {
    const loginInfos = useAppSelector(state => state.login);
    return <NavigationContainer>{loginInfos.username ? <Main /> : <Connexion />}</NavigationContainer>;
};

export default function App() {
    return (
        <Store>
            <Navigation />
        </Store>
    );
}
