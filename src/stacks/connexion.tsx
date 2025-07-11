import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ConnexionStackParamList } from "../types";
import { SignIn, SignUp } from "../screens";


const ConnexionStack = createNativeStackNavigator<ConnexionStackParamList>();

const Connexion = () => {
    return (
        <ConnexionStack.Navigator screenOptions={{ headerShown: false }}>
            <ConnexionStack.Screen
                name="SignIn"
                component={SignIn}
            />
            <ConnexionStack.Screen
                name="SignUp"
                component={SignUp}
            />
        </ConnexionStack.Navigator>
    );
};

export {Connexion}