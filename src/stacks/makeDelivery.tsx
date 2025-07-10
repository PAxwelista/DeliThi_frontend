import { DeliveryProvider } from "../context/orderContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MakeDeliveryStackParamList } from "../types";
import { BeginDeliveryScreen, DeliverOrderScreen, MapScreen, PrepareDeliveryScreen } from "../screens";

const MakeDeliveryStack = createNativeStackNavigator<MakeDeliveryStackParamList>();


const MakeDelivery = () => {
    return (
        <DeliveryProvider>
            <MakeDeliveryStack.Navigator screenOptions={{ headerShown: false }}>
                <MakeDeliveryStack.Screen
                    name="BeginDelivery"
                    component={BeginDeliveryScreen}
                />
                <MakeDeliveryStack.Screen
                    name="PrepareDelivery"
                    component={PrepareDeliveryScreen}
                />
                <MakeDeliveryStack.Screen
                    name="Map"
                    component={MapScreen}
                />
                <MakeDeliveryStack.Screen
                    name="DeliverOrder"
                    component={DeliverOrderScreen}
                />
            </MakeDeliveryStack.Navigator>
        </DeliveryProvider>
    );
};

export {MakeDelivery}