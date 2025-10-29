import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DeliveriesStackParamList } from "../types";
import { DeliveriesScreen, DetailDeliveryScreen,DetailOrderScreen } from "../screens";
import { headerReturnTab } from "./config";


const DeliveriesStack = createNativeStackNavigator<DeliveriesStackParamList>();

const Deliveries = () => {
    return (
        <DeliveriesStack.Navigator screenOptions={{ headerShown: false }}>
            <DeliveriesStack.Screen
                name="AllDeliveries"
                component={DeliveriesScreen}
            />
            <DeliveriesStack.Screen
                name="DetailDelivery"
                component={DetailDeliveryScreen}
                options={headerReturnTab}
            />
             <DeliveriesStack.Screen
                name="DetailOrder"
                component={DetailOrderScreen}
                options={headerReturnTab}
            />
        </DeliveriesStack.Navigator>
    );
};

export {Deliveries}