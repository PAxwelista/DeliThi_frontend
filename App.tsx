import { NavigationContainer } from "@react-navigation/native";
import { ConnectionScreen } from "./src/screens/";
//import { useAppSelector } from "./src/hooks";
import { Store } from "./src/store";
import { Main } from "./src/stacks/main";

const Navigation = () => {
    // const loginInfos = useAppSelector(state => state.login);
    return <NavigationContainer>{true  ? <Main /> : <ConnectionScreen />}</NavigationContainer>;
};

export default function App() {
    return (
        <Store>
            <Navigation />
        </Store>
    );
}
