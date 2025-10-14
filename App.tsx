import { NavigationContainer } from "@react-navigation/native";
import { useAppSelector } from "./src/hooks/redux";
import { Store } from "./src/store";
import { Main } from "./src/stacks/main";
import { Connexion } from "./src/stacks";
import { FontInit } from "./src/fontInit";
import { StatusBar } from "react-native";

const Navigation = () => {
    const loginInfos = useAppSelector(state => state.login);
    const demoMode = useAppSelector(state => state.demoMode);

    return (
        <FontInit>
            <NavigationContainer>{loginInfos.username || demoMode.value ? <Main /> : <Connexion />}</NavigationContainer>
        </FontInit>
    );
};

export default function App() {
    return (
        <Store>
            <StatusBar
                backgroundColor="#F2F2F2"
                barStyle="dark-content"
            />
            <Navigation />
        </Store>
    );
}
